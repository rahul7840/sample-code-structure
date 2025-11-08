import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { IsNormalUserDto } from './dto/is-normal-user.dto';
import { UserId } from '../utils/decorators/user-id.decorator';
import { UserAuthGuard } from '../utils/guards/auth.guard';

@Controller('user')
@UseGuards(UserAuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('is-normal-user')
    async isNormalUser(
        @Body() isNormalUserDto: IsNormalUserDto,
    ) {
        return this.userService.isNormalUser(isNormalUserDto);
    }

    @Get('manager')
    async getManagers(
    ) {
        return this.userService.getManagers();
    }

    @Get('profile')
    async getProfile(
        @UserId() user_id: number,
    ) {
        return this.userService.getProfile(user_id);
    }
}
