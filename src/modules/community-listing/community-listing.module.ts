import { Module } from '@nestjs/common';
import { CommunityListingService } from './community-listing.service';
import { CommunityListingController } from './community-listing.controller';
import { QuestionModel } from 'src/model/questions-model';
import { UserCommunityMappingModel } from 'src/model/user-community-mapping-model';
import { CommunityModel } from 'src/model/communities-mode';
import { MediaModel } from 'src/model/media-model';
import { UserQuestionAnswerMappingModel } from 'src/model/que-ans-mapping-model';
import { LocalitiesModel } from 'src/model/localities-model';
import { CategoryModel } from 'src/model/category-model';
import { UserProfileModel } from 'src/model/users-model';
import { CommunityItem } from 'src/model/communities-item-model';
import { Pulse } from 'src/model/pulses.model';
import { MarketModel } from 'src/model/market-model';
import { RoleModel } from 'src/model/role-model';

import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    SequelizeModule.forFeature([
      QuestionModel,
      CommunityModel,
      MediaModel,
      CommunityItem,
      Pulse,
      UserCommunityMappingModel,
      UserQuestionAnswerMappingModel,
      LocalitiesModel,
      CategoryModel,
      UserProfileModel,
      MarketModel,
      RoleModel,
    ]),
  ],
  providers: [CommunityListingService],
  controllers: [CommunityListingController],
})
export class CommunityListingModule {}
