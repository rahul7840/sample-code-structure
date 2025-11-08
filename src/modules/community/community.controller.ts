import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CommunityService } from './community.service';
import { AddCommunityDto } from './dto/add-community.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  CommunityItemDto,
  UpdateCommunityItemsDto,
} from './dto/add-community-item.dto';
import { JoinCommunityDto } from './dto/join-request.dto';
import { ItemTypeEnum } from 'src/model/communities-item-model';
import { UserId } from '../utils/decorators/user-id.decorator';

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
  @Post('join-request')
  async joinCommunity(@Body() joinCommunityDto: JoinCommunityDto) {
    return this.communityService.joinCommunity(joinCommunityDto);
  }

  @Get('admin-details/:community_id')
  async getCommunityList(
    @Query('type') type: string,
    @Param('community_id') community_id: number,
  ) {
    return this.communityService.getCommunityAdminDetails(type, community_id);
  }

  @Get('users/:community_id')
  async getCommunityUsers(@Param('community_id') community_id: number) {
    return this.communityService.getCommunityUsers(community_id);
  }

  @Get('join-request/:community_id')
  async getCommunityDetails(@Param('community_id') community_id: number) {
    return this.communityService.getJoinRequestDetails(community_id);
  }

  @Post('community-item/approve-toggle')
  async pulseToggler(
    @Body() body: UpdateCommunityItemsDto,
    @UserId() user_id: number,
  ) {
    return this.communityService.pulseToggler(
      body.community_item_ids,
      body.item_type_enum,
      user_id,
    );
  }
}
