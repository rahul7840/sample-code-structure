import { Module } from '@nestjs/common';
import { LocalityController } from './locality.controller';
import { LocalityService } from './locality.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { LocalitiesModel } from 'src/model/localities-model';
import { NearbyLocalityModel } from 'src/model/nearby-locality.model';

@Module({
  imports: [SequelizeModule.forFeature([LocalitiesModel,NearbyLocalityModel])],
  controllers: [LocalityController],
  providers: [LocalityService],
})
export class LocalityModule {}
