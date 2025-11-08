import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LocalitiesModel } from 'src/model/localities-model';
import { sendBadRequest, sendSuccess } from 'src/utils/response.util';

@Injectable()
export class LocalityService {
  constructor(
    @InjectModel(LocalitiesModel)
    private readonly localityModel: typeof LocalitiesModel,
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
}
