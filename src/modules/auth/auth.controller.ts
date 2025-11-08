import { Body, Controller, Param, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBadRequestResponse, ApiTags } from '@nestjs/swagger';
import { OtpVerificationDTO, UserLoginDTO } from './dto/login.dto';
import { SignUpDTO } from './dto/signup-dto';
import { Response } from 'express';
import { AddManagerDTO } from './dto/add-manager.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  login(@Body() body: UserLoginDTO) {
    return this.service.login(body);
  }

  @Post('signup')
  signup(@Body() body: SignUpDTO) {
    return this.service.signup(body);
  }

  @Post('add-manager')
  addManager(@Body() body: AddManagerDTO) {
    return this.service.addManager(body);
  }

  @Post('verifyOtp/:otp_id')
  verifyOtp(
    @Param('otp_id') otp_id: number,
    @Body() body: OtpVerificationDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.service.verifyOtp(otp_id, body, res);
  }
}
