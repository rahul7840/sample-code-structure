import { Controller } from '@nestjs/common';
import { CommunityListingService } from './community-listing.service';

@Controller('community-listing')
export class CommunityListingController {
    constructor(private readonly communityListingService: CommunityListingService) {}
}
