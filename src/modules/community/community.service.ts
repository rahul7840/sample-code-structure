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

@Injectable()
export class CommunityService {
  constructor(
    @InjectModel(CommunityModel)
    private readonly communityModel: typeof CommunityModel,
    @InjectModel(QuestionModel)
    private readonly questionModel: typeof QuestionModel,
    @InjectModel(MediaModel) private readonly mediaModel: typeof MediaModel,
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
}
