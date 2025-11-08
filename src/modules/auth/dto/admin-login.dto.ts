import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class AdminLoginDTO {
  @ApiProperty({ example: "admin@communitymodule.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "Admin@123" })
  @IsString()
  password: string;
}