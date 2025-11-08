import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserProfileModel } from 'src/model/users-model';
import { IsNormalUserDto } from './dto/is-normal-user.dto';
import { sendBadRequest, sendSuccess } from 'src/utils/response.util';
import { Op } from 'sequelize';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(UserProfileModel)
        private readonly userProfileModel: typeof UserProfileModel,
    ) {}

    async isNormalUser(isNormalUserDto: IsNormalUserDto) {
        try {

            const userProfile = await this.userProfileModel.findOne({
                where: {
                    [Op.or]: [
                        { email: isNormalUserDto.email },
                    ],
                    is_manager: false
                },
            });

            return sendSuccess('User status', {
                is_normal_user: userProfile,
            });

        } catch (error) {
            return sendBadRequest(error.message);
        }
    }
}
