import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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
    example: 100001,
  })
  job_title_id?: number;

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  @ApiProperty({
    type: [Number],
    description: 'Array of locality IDs the user is interested in',
    example: [100001, 100002],
  })
  interested_localities?: number[];

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  @ApiProperty({
    type: [Number],
    description: 'Array of category IDs the user is interested in',
    example: [100000, 100001],
  })
  interested_categories?: number[];
}
