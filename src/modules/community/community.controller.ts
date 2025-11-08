import { Body, Controller, Post } from '@nestjs/common';
import { CommunityService } from './community.service';
import { AddCommunityDto } from './dto/add-community.dto';

@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Post('add')
  async addCommunity(@Body() addCommunityDto: AddCommunityDto) {
    return this.communityService.addCommunity(addCommunityDto);
  }
}
