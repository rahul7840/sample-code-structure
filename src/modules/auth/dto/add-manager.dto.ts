import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AddManagerDTO {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email of the manager',
    example: 'manager@example.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Phone number of the manager',
    example: '1234567890',
  })
  phone_number: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Name of the manager',
    example: 'John Doe',
  })
  name: string;
}