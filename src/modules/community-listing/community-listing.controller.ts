import { Body, Controller, Post, Query } from '@nestjs/common';
import { CommunityListingService } from './community-listing.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ListingFilterDto } from './dto/listing.dto';
import { PostgresFunctionService } from './storage/postgres-function.service';
import { UserId } from '../utils/decorators/user-id.decorator';

@Controller('community-listing')
@ApiTags('Listing')
export class CommunityListingController {
  constructor(
    private readonly communityListingService: CommunityListingService,
  ) {}

  @Post('all-co-projects')
  @ApiQuery({
    name: 'record_per_page',
    required: false,
    example: 10,
  })
  @ApiQuery({
    name: 'page_no',
    required: false,
    example: 1,
  })
  async getAll(
    @Body() body: ListingFilterDto,
    @Query('page_no') page_no: number,
    @Query('record_per_page') record_per_page: number,
    @UserId() user_id: number,
  ) {
    return await this.communityListingService.getAllCommunity(
      body,
      page_no,
      record_per_page,
      user_id,
    );
  }
}
