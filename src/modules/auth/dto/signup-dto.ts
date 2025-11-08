import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SignUpDTO {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: String,
    description: 'Email of the user',
    example: 'W9S7H@example.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Name of the user',
    example: 'John Doe',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Name of the Company',
    example: 'ABC Corp',
  })
  company_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Mobile number of the user',
    example: '1234567890',
  })
  mobile_number: string;

  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'Mobile number of the user',
    example: 1111,
  })
  job_title_id?: number;
}
