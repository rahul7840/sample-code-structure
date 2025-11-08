import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LocalitiesModel } from 'src/model/localities-model';
import { NearbyLocalityModel } from 'src/model/nearby-locality.model';
import { sendBadRequest, sendSuccess } from 'src/utils/response.util';

@Injectable()
export class LocalityService {
  constructor(
    @InjectModel(LocalitiesModel)
    private readonly localityModel: typeof LocalitiesModel,
    @InjectModel(NearbyLocalityModel)
    private readonly nearbyLocalityModel: typeof NearbyLocalityModel,
  ) {}

  async getLocalities() {
    try {
      const localities = await this.localityModel.findAll({
        attributes: ['locality_id', 'locality_name'],
      });
      return sendSuccess('Locality list fetched successfully', localities);
    } catch (error) {
      return sendBadRequest(error.message);
    }
  }

  async findNearest(source_locality_id: number) {
    try {
      const responce = await this.nearbyLocalityModel.findAll({
        where: {
          source_locality_id,
        },
        attributes: ['source_locality', 'locality_id', 'locality'],
      });
      return sendSuccess('success', responce);
    } catch (e) {
      console.log(e);
      return sendBadRequest(`Something gone wrong ${e}`);
    }
  }
}
