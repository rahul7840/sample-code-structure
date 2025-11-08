import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModel } from './model/category-model';
import { CommunityModel } from './model/communities-mode';
import { UserCommunityMappingModel } from './model/user-community-mapping-model';
import { JobTitleModel } from './model/job-title-model';
import { LocalitiesModel } from './model/localities-model';
import { MediaModel } from './model/media-model';
import { UserQuestionAnswerMappingModel } from './model/que-ans-mapping-model';
import { QuestionModel } from './model/questions-model';
import { RoleModel } from './model/role-model';
import { UserProfileModel } from './model/users-model';
import { CategoryModule } from './modules/category/category.module';
import { OTPModel } from './model/otp.model';
import { AuthModule } from './modules/auth/auth.module';
import { CommunityModule } from './modules/community/community.module';
import { LocalityModule } from './modules/locality/locality.module';
import { JobTitlesModule } from './modules/job-titles/job-titles.module';
import { FilesModule } from './modules/files/files.module';
import { UserModule } from './modules/user/user.module';
import { Pulse } from './model/pulses.model';
import { CommunityItem } from './model/communities-item-model';
import { MarketModel } from './model/market-model';
import { NearbyLocalityModel } from './model/nearby-locality.model';
import { CommunityListingModule } from './modules/community-listing/community-listing.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.db_host,
      port: Number(process.env.db_port),
      username: process.env.db_username,
      password: process.env.db_password,
      database: process.env.db_name,
      timezone: '+05:30',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
        statement_timeout: 30000,
        idle_in_transaction_session_timeout: 20000,
      },
      models: [
        CommunityModel,
        CategoryModel,
        UserCommunityMappingModel,
        JobTitleModel,
        LocalitiesModel,
        MediaModel,
        UserQuestionAnswerMappingModel,
        QuestionModel,
        RoleModel,
        UserProfileModel,
        OTPModel,
        Pulse,
        CommunityItem,
        MarketModel,
        NearbyLocalityModel,
      ],
      synchronize: false,
      autoLoadModels: true,
      define: {
        freezeTableName: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
      logging: false,
      pool: {
        max: 50,
        min: 3,
        acquire: 30000,
        idle: 10000,
        evict: 1000,
        maxUses: 7500,
      },
    }),
    AuthModule,
    CategoryModule,
    CommunityModule,
    JobTitlesModule,
    AuthModule,
    CommunityModule,
    LocalityModule,
    JobTitlesModule,
    FilesModule,
    UserModule,
    CommunityListingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
