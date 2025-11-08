import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JobTitleModel } from 'src/model/job-title-model';
import { sendBadRequest, sendSuccess } from 'src/utils/response.util';

@Injectable()
export class JobTitlesService {
  constructor(
    @InjectModel(JobTitleModel)
    private readonly jobTitleModel: typeof JobTitleModel,
  ) {}

  async getJobTitles() {
    try {
      const jobs = await this.jobTitleModel.findAll();

      return sendSuccess('Job titles fetched successfully', jobs);
    } catch (error) {
      return sendBadRequest(error.message);
    }
  }
}
