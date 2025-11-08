import { Controller, Get } from '@nestjs/common';
import { LocalityService } from './locality.service';

@Controller('locality')
export class LocalityController {
  constructor(private readonly localityService: LocalityService) {}

  @Get()
  getAllLocalities() {
    return this.localityService.getLocalities();
  }
}
