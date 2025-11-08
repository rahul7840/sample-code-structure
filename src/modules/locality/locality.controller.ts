import { Controller, Get, Param } from '@nestjs/common';
import { LocalityService } from './locality.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('locality')
@ApiTags('Locality')
export class LocalityController {
  constructor(private readonly localityService: LocalityService) {}

  @Get()
  getAllLocalities() {
    return this.localityService.getLocalities();
  }

  @Get('nearest/locality/:source_locality_id')
  async findNearest(@Param('source_locality_id') source_locality_id: number) {
    return this.localityService.findNearest(source_locality_id);
  }
}
