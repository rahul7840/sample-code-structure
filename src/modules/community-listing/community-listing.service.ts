import { Injectable } from '@nestjs/common';
import { ListingFilterDto } from './dto/listing.dto';
import { PostgresFunctionService } from './storage/postgres-function.service';
import { sendSuccess } from 'src/utils/response.util';

@Injectable()
export class CommunityListingService {
  constructor(private postgresFunctionService: PostgresFunctionService) {}

  async getAllCommunity(
    body: ListingFilterDto,
    page_no: number,
    record_per_page: number,
    user_id: number,
  ) {
    const payload = [
      body.community_id?.join(',') || '',
      body.category_id?.join(',') || 0,
      body.locality_id?.join(',') || '',
      user_id || 0,
      body.is_nearby || null,
      body.sort_by || 1,
      page_no || 1,
      record_per_page || 10,
      body.joined_community || false,
    ];

    const data = await this.postgresFunctionService.getAll(payload);
    const count = await this.postgresFunctionService.getAllCount(payload);

    return sendSuccess('success', data, count);
  }
}
