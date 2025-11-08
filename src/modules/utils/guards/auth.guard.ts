import { Request } from 'express';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { UserProfileModel } from 'src/model/users-model';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserAuthGuard extends AuthGuard('Authorization') {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(UserProfileModel) private userModel: typeof UserProfileModel,
  ) {
    super(jwtService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const tokenFromHeader = request.headers?.authorization;
    const tokenFromCookie = request.cookies?.Authorization;

    let token = tokenFromCookie || tokenFromHeader;

    console.log("token in authguard: ", token);

    token = token.replace("Bearer ", "");

    if (!token) {
      return false;
    }

    try {
      const decoded: any = await this.findByToken(token);

      console.log("decoded: ", decoded);

      const user = await this.userModel.findOne({
        where: { user_id: decoded.id },
      });

      if (!user) {
        return false;
      }

      return true;
    } catch (error) {
      console.log("error: ", error);
      return false;
    }
  }
  async findByToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}
