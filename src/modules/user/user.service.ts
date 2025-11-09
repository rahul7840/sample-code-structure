import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserProfileModel } from 'src/model/users-model';
import { IsNormalUserDto } from './dto/is-normal-user.dto';
import { sendBadRequest, sendSuccess } from 'src/utils/response.util';
import { Op } from 'sequelize';
import { UserCommunityMappingModel } from 'src/model/user-community-mapping-model';
import { CommunityModel } from 'src/model/communities-mode';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(UserProfileModel)
        private readonly userProfileModel: typeof UserProfileModel,
        @InjectModel(UserCommunityMappingModel)
        private readonly userCommunityMappingModel: typeof UserCommunityMappingModel,
        @InjectModel(CommunityModel)
        private readonly communityModel: typeof CommunityModel,
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

    async getManagers() {
        try {
            const managers = await this.userProfileModel.findAll({
                where: {
                    is_manager: true
                },
            });

            return sendSuccess('Managers', managers);
        } catch (error) {
            return sendBadRequest(error.message);
        }
    }

    async getProfile(user_id: number) {
        try {
            const userProfile = await this.userProfileModel.findOne({
                where: {
                    user_id
                },
            });

            const userCommunities = await this.userCommunityMappingModel.findAll({
                where: {
                    user_id,
                },
                include: [
                    {
                        model: this.communityModel,
                    }
                ]
            });

            // const userPlusesMarketPlace = await this.userCommunityMappingModel

            return sendSuccess('User profile', {
                userProfile,
                userCommunities
            });
        } catch (error) {
            return sendBadRequest(error.message);
        }
    }
}
