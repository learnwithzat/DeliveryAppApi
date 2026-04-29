import { Controller, Get } from '@nestjs/common';
import { RootAreasService } from './root-areas.service';

@Controller('root-areas')
export class RootAreasController {
  constructor(private readonly rootAreasService: RootAreasService) {}

  @Get()
  findAll() {
    return this.rootAreasService.findAll();
  }
}
