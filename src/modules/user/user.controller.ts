import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { IsNormalUserDto } from './dto/is-normal-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('is-normal-user')
    async isNormalUser(
        @Body() isNormalUserDto: IsNormalUserDto,
    ) {
        return this.userService.isNormalUser(isNormalUserDto);
    }
}
