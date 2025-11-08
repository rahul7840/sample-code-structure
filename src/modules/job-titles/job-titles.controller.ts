import { Controller, Get } from '@nestjs/common';
import { JobTitlesService } from './job-titles.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('job-titles')
@ApiTags('Job title')
export class JobTitlesController {
  constructor(private readonly jobTitlesService: JobTitlesService) {}

  @Get()
  async getJobTitles() {
    return this.jobTitlesService.getJobTitles();
  }
}
