import { Injectable } from '@nestjs/common';
import { OtpVerificationDTO, UserLoginDTO } from './dto/login.dto';
import { UserProfileModel } from 'src/model/users-model';
import { InjectModel } from '@nestjs/sequelize';
import { sendBadRequest, sendSuccess } from 'src/utils/response.util';
import { Op, QueryTypes, Transaction, where } from 'sequelize';
import * as moment from 'moment';
import { OTPModel } from 'src/model/otp.model';
import { SignUpDTO } from './dto/signup-dto';
import { Sequelize } from 'sequelize-typescript';
import { Response } from 'express';

// import * as encryption from 'src/modules/utils/encryption.utlis';

//Import Packages
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserProfileModel) private userModel: typeof UserProfileModel,
    @InjectModel(OTPModel) private otpModel: typeof OTPModel,
    private sequelize: Sequelize,
  ) {}

  async login(body: UserLoginDTO): Promise<{
    data: { otp_id: number };
    meta: {};
  }> {
    try {
      const user = await this.userModel.findOne({
        where: {
          mobile_number: body.mobile_number,
        },
      });

      if (!user) {
        return sendBadRequest('user not found');
      }

      // if (user.is_blocked) {
      //   return sendBadRequest(localizedMessages.user.blocked_user);
      // }

      const currentTime = moment();
      const loginAttempts = await this.otpModel.findAll({
        where: {
          created_for: user.user_id,
          created_at: { [Op.gte]: moment().subtract(5, 'minutes').toDate() },
        },
      });

      if (loginAttempts.length >= 5) {
        const lastAttempt = loginAttempts[0];
        const timeDiff = moment().diff(
          moment(lastAttempt.created_at),
          'minutes',
        );
        const coolDownTime = 5 - timeDiff;
        if (coolDownTime > 0) {
          return sendBadRequest(
            `Too many attempts Please try again after ${coolDownTime} minutes.`,
          );
        }
      }

      // const otp = Math.floor(100000 + Math.random() * (999999 - 100000 + 1));
      const otp = 999999;

      const otpModel = await this.otpModel.create({
        created_for: user.user_id,
        otp: otp,
        valid_till: moment().add(5, 'minutes').toDate(),
        created_by: user.user_id,
        updated_by: user.user_id,
      });

      return sendSuccess('otp_send_success', {
        otp_id: otpModel.otp_id,
      });
    } catch (err) {
      console.log('something went wrong while login', err);
      return sendBadRequest(err.message);
    }
  }

  async signup(
    body: SignUpDTO,
  ): Promise<{ message: string; data: { otp_id: number }; meta: {} }> {
    const t: Transaction = await this.sequelize.transaction();

    try {
      if (!/^[6-9]\d{9}$/.test(body.mobile_number)) {
        return sendBadRequest(`invalid_mobile_number`);
      }

      // const user = await this.userModel.findOne({
      //   where: {
      //     [Op.or]: [{ mobile_number: body.mobile_number }],
      //   },
      //   transaction: t,
      // });

      const otp = 999999;

      const newUser = await this.userModel.create(
        {
          name: body.name,
          company_name: body.company_name,
          phone_number: body.mobile_number,
          email: body.email,
          job_title_id: body.job_title_id ?? null,
        },
        { transaction: t },
      );
      console.log(`created`, JSON.stringify(newUser, null, 2));
      // await newUser.update(
      //   {
      //     created_by: newUser.user_id,
      //     updated_by: newUser.user_id,
      //   },
      //   { transaction: t },
      // );

      const otpModel = await this.otpModel.create(
        {
          created_for: newUser.user_id,
          otp: otp,
          valid_till: moment().add(5, 'minutes').toDate(),
          created_by: newUser.user_id,
          updated_by: newUser.user_id,
          is_verified: false,
        },
        { transaction: t },
      );

      await t.commit();

      return sendSuccess(`otp_send_success`, {
        otp_id: otpModel.otp_id,
      });
    } catch (err) {
      await t.rollback();
      return sendBadRequest(err.message);
    }
  }

  async verifyOtp(otp_id: number, body: OtpVerificationDTO, res: Response) {
    const t: Transaction = await this.sequelize.transaction();

    try {
      const otp = await this.otpModel.findOne({
        where: {
          otp_id: otp_id,
          otp: body.otp,
        },
        transaction: t,
      });

      if (!otp) {
        return sendBadRequest(`otp verify failed`);
      }

      // if (moment(otp.valid_till).isBefore(moment())) {
      //   return sendBadRequest(`otp verify failed`);
      // }

      const user = await this.userModel.findOne({
        where: {
          user_id: otp.created_for,
        },
        transaction: t,
      });

      if (!user) {
        return sendBadRequest(`user not found`);
      }

      await this.otpModel.update(
        {
          is_verified: true,
        },
        {
          where: {
            created_for: user.user_id,
          },
          transaction: t,
        },
      );

      const criteriaForJWT = {
        id: user.user_id,
        date: new Date(),
      };

      console.log('process.env.jwtSecret', process.env.JWT_SECRET);

      const token: string = await generateAuthToken(criteriaForJWT);
      res.cookie('Authorization', token, {});

      console.log('token', token);

      await t.commit();
      const data = {
        token: token,
        user_id: user?.user_id,
        user_name: user?.name,
      };
      return sendSuccess('success', data, {});
    } catch (err) {
      await t.rollback();
      console.log(err);
      sendBadRequest('failed to load');
    }
  }
}

const generateAuthToken = (criteriaForJwt: any): string => {
  const secret = process.env.JWT_SECRET || 'fallback_secret';

  try {
    const token = jwt.sign(criteriaForJwt, secret, { expiresIn: '1d' });
    return token;
  } catch (error) {
    console.error('JWT Sign Error:', error);
    throw new Error('Failed to generate auth token');
  }
};
