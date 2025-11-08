import { Injectable } from '@nestjs/common';
import { CommunityModel } from 'src/model/communities-mode';
import { UserCommunityMappingModel } from 'src/model/user-community-mapping-model';
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
import { JoinCommunityDto } from './dto/join-request.dto';
import { RoleModel } from 'src/model/role-model';

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
    @InjectModel(CommunityItem) private readonly communityItemModel: typeof CommunityItem,
    @InjectModel(Pulse) private readonly pulseModel: typeof Pulse,
    @InjectModel(UserCommunityMappingModel) private readonly userCommunityMappingModel: typeof UserCommunityMappingModel,
    @InjectModel(UserProfileModel) private readonly userProfileModel: typeof UserProfileModel,
    @InjectModel(UserQuestionAnswerMappingModel) private readonly userQuestionAnswerMappingModel: typeof UserQuestionAnswerMappingModel,
    @InjectModel(LocalitiesModel) private readonly localitiesModel: typeof LocalitiesModel,
    @InjectModel(CategoryModel) private readonly categoryModel: typeof CategoryModel,
    @InjectModel(RoleModel) private readonly roleModel: typeof RoleModel,
  ) { }

  async addCommunity(addCommunityDto: AddCommunityDto) {
    try {

      const community = await this.communityModel.create({
        locality_id: addCommunityDto.locality_id,
        category_id: addCommunityDto.category_id,
        community_name: addCommunityDto.community_name,
        community_description: addCommunityDto.community_description,
        status_enum: addCommunityDto.status_enum,
        manager_id: addCommunityDto.manager_id,
        media_id: addCommunityDto.banner_image,
      });

      await this.questionModel.bulkCreate(
        addCommunityDto.questions.map((question) => ({
          ...question,
          community_id: community.community_id,
        })),
      );

      await this.userCommunityMappingModel.create({
        user_id: addCommunityDto.manager_id,
        community_id: community.community_id,
        role_id: await this.roleModel.findOne({
          where: {
            role_name: 'Community Manager',
          },
        }).then((role) => role.role_id),
        is_approved: true,
      });

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
          community_item_id: CreateIntoCommunity.community_item_id
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
          community_item_id: CreateIntoCommunity.community_item_id,
        });
      }
      const responce = {
        community: CreateIntoCommunity,
        community_item: finalResponce,
      };

      return sendSuccess('success', responce);
    } catch (e) {
      console.log(e);
      sendBadRequest('something went wrong ');
    }
  }

  async getCommunityAdminDetails(
    type: string,
    community_id: number,
  ) {
    try {

      const communityItems = await this.communityItemModel.findAll({
        where: {
          community_id,
          item_type_enum: type,
        },
        include: [
          {
            model: this.pulseModel,
            as: 'pulse',
          },
          {
            model: this.marketModel,
            as: 'market',
          }
        ]
      });

      return sendSuccess('Community items fetched successfully', communityItems);

    } catch (error) {
      return sendBadRequest(error.message);
    }
  }

  async getCommunityUsers(
    community_id: number,
  ) {
    try {
      const communityUsers = await this.userCommunityMappingModel.findAll({
        where: {
          community_id,
        },
        include: [
          {
            model: this.userProfileModel,
            as: 'userProfile',
          }
        ]
      });

      const communityUsersWithDetails = communityUsers.map((user) => ({
        ...user.userProfile.toJSON(),
      }));

      return sendSuccess('Community users fetched successfully', communityUsersWithDetails);

    } catch (error) {
      return sendBadRequest(error.message);
    }
  }

  async getJoinRequestDetails(
    community_id: number,
  ) {
    try {

      const joinRequests = await this.userCommunityMappingModel.findAll({
        where: {
          community_id,
          is_approved: false,
        },
        include: [
          {
            model: this.userProfileModel,
            as: 'userProfile',
          },
        ]
      });

      const joinRequestsWithDetails = joinRequests.map((request) => ({
        ...request.userProfile.toJSON(),
      }));

      return sendSuccess('Join requests fetched successfully', joinRequestsWithDetails);

    } catch (error) {
      return sendBadRequest(error.message);
    }
  }

  async getUserCommunityQuestionAnswers(
    community_id: number,
    user_id: number,
  ) {
    try {

      const questionAnswers = await this.questionModel.findAll({
        where: {
          community_id,
        },
        include: [
          {
            model: this.userQuestionAnswerMappingModel,
            as: 'userQuestionAnswerMapping',
            where: {
              user_id,
            }
          }
        ]
      });

      const questionAnswersWithDetails = questionAnswers.map((question) => ({
        question: question.question_description,
        userAnswer: question.userQuestionAnswerMapping?.answer,
      }));

      return sendSuccess('Community questions fetched successfully', questionAnswersWithDetails);

    } catch (error) {
      return sendBadRequest(error.message);
    }
  }

  async joinCommunity(
    joinCommunityDto: JoinCommunityDto,
  ) {
    try {

      const role = await this.roleModel.findOne({
        where: {
          role_name: 'End-User',
        }
      });

      const userCommunityMapping = await this.userCommunityMappingModel.create({
        community_id: joinCommunityDto.community_id,
        user_id: joinCommunityDto.user_id,
        is_approved: false,
        role_id: role.role_id,
      });

      await this.userQuestionAnswerMappingModel.bulkCreate(
        joinCommunityDto.questionAnswers.map((questionAnswer) => ({
          ...questionAnswer,
          question_id: questionAnswer.question_id,
          answer: questionAnswer.answer,
          user_id: joinCommunityDto.user_id,
        })),
      );

      return sendSuccess('Join request sent successfully', {});
    } catch (error) {
      return sendBadRequest(error.message);
    }
  }

  async getCommunityAdminListing(user_id: number) {
    try {

      const user = await this.userProfileModel.findOne({
        where: {
          user_id,
        },
        attributes: ['is_manager'],
      });

      if (!user.is_manager && user.is_super_admin) {

        const communities = await this.communityModel.findAll({
          where: {
          },
        });

        let totalMembers: number = 0, totalCommunities: number = 0, totalPosts: number = 0;

        for (const community of communities) {
          totalMembers += Number(community.member_count);
          totalCommunities++;
          totalPosts += Number(community.post_count);
        }

        return sendSuccess('Community admin listing fetched successfully', communities, {
          totalMembers,
          totalCommunities,
          totalPosts,
        });
      } else {
        const communities = await this.userCommunityMappingModel.findAll({
          where: {
            user_id,
          },
          include: [
            {
              model: this.communityModel,
              as: 'community',
            },
            {
              model: this.roleModel,
              as: 'role',
              where: {
                role_name: 'Community Manager',
              },
              required: true,
            }
          ]
        });

        const communitiesWithDetails = communities.map((community) => ({
          ...community.community.toJSON(),
        }));

        let totalMembers: number = 0;
        let totalPosts: number = 0;

        for (const community of communitiesWithDetails) {
          totalMembers += Number(community.member_count);
          totalPosts += Number(community.post_count);
        }

        return sendSuccess('Community admin listing fetched successfully', communitiesWithDetails, {
          totalMembers,
          totalPosts,
        });
      }


    } catch (error) {
      return sendBadRequest(error.message);
    }
  }
}
