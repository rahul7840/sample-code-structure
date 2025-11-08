import { Module } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CommunityController } from './community.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { QuestionModel } from 'src/model/questions-model';
import { UserCommunityMappingModel } from 'src/model/community-mapping-model';
import { CommunityModel } from 'src/model/communities-mode';
import { MediaModel } from 'src/model/media-model';
import { UserQuestionAnswerMappingModel } from 'src/model/que-ans-mapping-model';
import { LocalitiesModel } from 'src/model/localities-model';
import { CategoryModel } from 'src/model/category-model';
import { UserProfileModel } from 'src/model/users-model';
import { CommunityItem } from 'src/model/communities-item-model';
import { Pulse } from 'src/model/pulses.model';
import { MarketModel } from 'src/model/market-model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      QuestionModel,
      CommunityModel,
      MediaModel,
      CommunityItem,
      Pulse,
      MarketModel
    ]),
  ],
  providers: [CommunityService],
  controllers: [CommunityController],
})
export class CommunityModule {}

