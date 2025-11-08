import { Injectable } from '@nestjs/common';
import { CommunityModel } from 'src/model/communities-mode';
import { UserCommunityMappingModel } from 'src/model/community-mapping-model';
import { AddCommunityDto } from './dto/add-community.dto';
import { sendBadRequest, sendSuccess } from 'src/utils/response.util';
import { QuestionModel } from 'src/model/questions-model';
import { UserProfileModel } from 'src/model/users-model';
import { CategoryModel } from 'src/model/category-model';
import { LocalitiesModel } from 'src/model/localities-model';
import { UserQuestionAnswerMappingModel } from 'src/model/que-ans-mapping-model';
import { MediaModel } from 'src/model/media-model';
import { InjectModel } from '@nestjs/sequelize';
import { CommunityItemDto } from './dto/add-community-item.dto';
import { CommunityItem, ItemTypeEnum } from 'src/model/communities-item-model';
import { Pulse } from 'src/model/pulses.model';
import { MarketModel } from 'src/model/market-model';

@Injectable()
export class CommunityService {
  constructor(
    @InjectModel(CommunityModel)
    private readonly communityModel: typeof CommunityModel,
    @InjectModel(QuestionModel)
    private readonly questionModel: typeof QuestionModel,
    @InjectModel(MediaModel) private readonly mediaModel: typeof MediaModel,
    @InjectModel(MarketModel) private readonly marketModel: typeof MarketModel,
    @InjectModel(Pulse) private readonly pulse: typeof Pulse,
    @InjectModel(CommunityItem)
    private readonly communityItem: typeof CommunityItem,
  ) {}

  async addCommunity(addCommunityDto: AddCommunityDto) {
    try {
      const media = await this.mediaModel.create({
        size: addCommunityDto.banner_image.size,
        file_path: addCommunityDto.banner_image.file_path,
        original_file_name: addCommunityDto.banner_image.original_file_name,
        mimetype: addCommunityDto.banner_image.mimetype,
        file_name: addCommunityDto.banner_image.file_name,
      });

      const community = await this.communityModel.create({
        locality_id: addCommunityDto.locality_id,
        category_id: addCommunityDto.category_id,
        community_name: addCommunityDto.community_name,
        community_description: addCommunityDto.community_description,
        status_enum: addCommunityDto.status_enum,
        manager_id: addCommunityDto.manager_id,
        media_id: media.media_id,
      });

      await this.questionModel.bulkCreate(
        addCommunityDto.questions.map((question) => ({
          ...question,
          community_id: community.community_id,
        })),
      );

      return sendSuccess('Community added successfully', {});
    } catch (error) {
      return sendBadRequest(error.message);
    }
  }

  async addCommunityItems(dto: CommunityItemDto) {
    try {
      const CreateIntoCommunity = await this.communityItem.create({
        ...dto,
      });

      let finalResponce;
      if (CreateIntoCommunity && dto.item_type_enum === ItemTypeEnum.PULS) {
        finalResponce = await this.pulse.create({
          title: dto.pulse_title,
          description: dto.pulse_description,
        });
      } else if (
        CreateIntoCommunity &&
        dto.item_type_enum === ItemTypeEnum.MARKET
      ) {
        finalResponce = await this.marketModel.create({
          post_type: dto.market_post_type,
          title: dto.market_title ?? null,
          description: dto.market_description ?? null,
          category_name: dto.market_category_name ?? null,
          address: dto.market_address ?? null,
          amount: dto.market_amount ?? null,
          name: dto.market_name ?? null,
          mobile_number: dto.market_mobile_number ?? null,
          community_item_id: dto.market_community_item_id,
        });
      }
      const responce = {
        community: CreateIntoCommunity,
        community_item: finalResponce,
      };

      sendSuccess('success', responce);
    } catch (e) {
      console.log(e);
      sendBadRequest('something went wrong ');
    }
  }
}
