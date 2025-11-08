import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserProfileModel } from 'src/model/users-model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([UserProfileModel])],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
