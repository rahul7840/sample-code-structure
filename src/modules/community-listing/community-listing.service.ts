import { Injectable } from '@nestjs/common';
import { ListingFilterDto } from './dto/listing.dto';
import { PostgresFunctionService } from './storage/postgres-function.service';
import { sendBadRequest, sendSuccess } from 'src/utils/response.util';
import { InjectModel } from '@nestjs/sequelize';
import { CommunityModel } from 'src/model/communities-mode';
import { CommunityItem } from 'src/model/communities-item-model';
import { Pulse } from 'src/model/pulses.model';
import { PulseMedia } from 'src/model/pulse-media-model';
import { MediaModel } from 'src/model/media-model';
import { MarketModel } from 'src/model/market-model';
import { CommunityItemComment } from 'src/model/community-item-comments-model';

@Injectable()
export class CommunityListingService {
  constructor(
    private postgresFunctionService: PostgresFunctionService,
    @InjectModel(CommunityModel)
    private communityModel: typeof CommunityModel,
    @InjectModel(CommunityItem)
    private communityItemModel: typeof CommunityItem,
    @InjectModel(Pulse)
    private pulseModel: typeof Pulse,
    @InjectModel(MarketModel)
    private marketModel: typeof MarketModel,
  ) {}

  async getAllCommunity(
    body: ListingFilterDto,
    page_no: number,
    record_per_page: number,
    user_id: number,
  ) {
    const payload = [
      body.community_id?.join(',') || '',
      body.category_id?.join(',') || '',
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

  async getPulse(
    user_id: number,
    community_id: number,
  ) {

    try {

      const pulses = await this.communityItemModel.findAll({
        where: {
          community_id,
          item_type_enum: 'PULSE',
        },
        include: [
          {
            model: this.pulseModel,
            include: [
              {
                model: PulseMedia,
                include: [
                  {
                    model: MediaModel,
                  }
                ]
              },
            ]
          },
          {
            model: CommunityItemComment,
            as: 'comments',
          }
        ],
      });

      return sendSuccess('success', pulses);
    } catch (error) {
      return sendBadRequest(error.message);
    }
  }

  async getMarketplace(
    user_id: number,
    community_id: number,
  ) {
    try {
      const marketPlaces = await this.communityItemModel.findAll({
        where: {
          community_id,
          item_type_enum: 'MARKET',
        },
        include: [
          {
            model: this.marketModel,
          },
        ],
      });

      return sendSuccess('success', marketPlaces);
    } catch (error) {
      return sendBadRequest(error.message);
    }
  }
}
