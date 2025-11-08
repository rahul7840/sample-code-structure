import { Module } from '@nestjs/common';
import { JobTitlesService } from './job-titles.service';
import { JobTitlesController } from './job-titles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { JobTitleModel } from 'src/model/job-title-model';

@Module({
  imports: [SequelizeModule.forFeature([JobTitleModel])],
  providers: [JobTitlesService],
  controllers: [JobTitlesController],
})
export class JobTitlesModule {}
