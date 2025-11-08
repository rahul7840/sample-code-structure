import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserLoginDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: '7041444444',
    description: 'Mobile Number',
  })
  mobile_number: string;
}

export class OtpVerificationDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: '123456',
    description: 'OTP',
  })
  otp: string;
}
