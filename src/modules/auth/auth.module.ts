import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserProfileModel } from 'src/model/users-model';
import { SequelizeModule } from '@nestjs/sequelize';
import { OTPModel } from 'src/model/otp.model';

@Module({
  imports: [SequelizeModule.forFeature([UserProfileModel, OTPModel])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
