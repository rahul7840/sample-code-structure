import { Injectable } from '@nestjs/common';
import { ListingFilterDto } from './dto/listing.dto';

@Injectable()
export class CommunityListingService {
  async getAllCommunity(
    body: ListingFilterDto,
    page_no: number,
    record_per_page: number,
  ) {}
}
