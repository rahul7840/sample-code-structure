import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserProfileModel } from 'src/model/users-model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserCommunityMappingModel } from 'src/model/user-community-mapping-model';
import { CommunityModel } from 'src/model/communities-mode';

@Module({
  imports: [SequelizeModule.forFeature([UserProfileModel, UserCommunityMappingModel, CommunityModel])],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
