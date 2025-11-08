import { Body, Controller, Post } from '@nestjs/common';
import { CommunityService } from './community.service';
import { AddCommunityDto } from './dto/add-community.dto';
import { ApiTags } from '@nestjs/swagger';
import { CommunityItemDto } from './dto/add-community-item.dto';

@Controller('community')
@ApiTags('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Post('add')
  async addCommunity(@Body() addCommunityDto: AddCommunityDto) {
    return this.communityService.addCommunity(addCommunityDto);
  }

  @Post('community-item')
  async communityItem(@Body() dto: CommunityItemDto) {
    return await this.communityService.addCommunityItems(dto);
  }
}
