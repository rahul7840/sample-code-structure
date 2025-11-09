import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
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
import { UserAuthGuard } from '../utils/guards/auth.guard';

@Controller('community')
@ApiTags('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) { }

  @Post('add')
  @UseGuards(UserAuthGuard)
  async addCommunity(@Body() addCommunityDto: AddCommunityDto) {
    return this.communityService.addCommunity(addCommunityDto);
  }

  @Post('community-item')
  @UseGuards(UserAuthGuard)
  async communityItem(@Body() dto: CommunityItemDto) {
    return await this.communityService.addCommunityItems(dto);
  }

  @Post('join-request')
  @UseGuards(UserAuthGuard)
  async joinCommunity(@Body() joinCommunityDto: JoinCommunityDto, @UserId() user_id: number) {
    return this.communityService.joinCommunity(joinCommunityDto, user_id);
  }

  @Patch('approve/join-request/:mapping_id')
  async approveJoinReq(@Param('mapping_id') mapping_id: number) {
    return this.communityService.approveJoinReq(mapping_id);
  }

  @Get('admin-listing')
  @UseGuards(UserAuthGuard)
  async getCommunityAdminListing(@UserId() user_id: number) {
    return this.communityService.getCommunityAdminListing(user_id);
  }

  @Get('admin-dashboard')
  @UseGuards(UserAuthGuard)
  async getCommunityAdminDashboard(@UserId() user_id: number) {
    return this.communityService.getCommunityAdminDashboard();
  }

  @Get('user-question-answers')
  @UseGuards(UserAuthGuard)
  async getUserCommunityQuestionAnswers(
    @Query('community_id') community_id: number,
    @Query('user_id') user_id: number,
  ) {
    return this.communityService.getUserCommunityQuestionAnswers(
      community_id,
      user_id,
    );
  }

  @Get('community-questions/:community_id')
  @UseGuards(UserAuthGuard)
  async getCommunityQuestions(@Param('community_id') community_id: number) {
    return this.communityService.getCommunityQuestions(community_id);
  }

  @Get('admin-details/:community_id')
  @UseGuards(UserAuthGuard)
  async getCommunityList(
    @Query('type') type: string,
    @Param('community_id') community_id: number,
  ) {
    return this.communityService.getCommunityAdminDetails(type, community_id);
  }

  @Get('users/:community_id')
  @UseGuards(UserAuthGuard)
  async getCommunityUsers(@Param('community_id') community_id: number) {
    return this.communityService.getCommunityUsers(community_id);
  }

  @Get('join-request/:community_id')
  @UseGuards(UserAuthGuard)
  async getCommunityDetails(@Param('community_id') community_id: number) {
    return this.communityService.getJoinRequestDetails(community_id);
  }

  @Post('community-item/approve-toggle')
  @UseGuards(UserAuthGuard)
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

  @Get(':community_id')
  async getCommunityDetailsById(@Param('community_id') community_id: number) {
    return this.communityService.getCommunityDetailsById(community_id);
  }
}
