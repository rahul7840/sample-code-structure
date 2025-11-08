import { Controller, Get } from '@nestjs/common';
import { JobTitlesService } from './job-titles.service';

@Controller('job-titles')
export class JobTitlesController {
  constructor(private readonly jobTitlesService: JobTitlesService) {}

  @Get()
  async getJobTitles() {
    return this.jobTitlesService.getJobTitles();
  }
}
