import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RootArea } from './root-area.entity';
import { RootAreasService } from './root-areas.service';
import { RootAreasController } from './root-areas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RootArea])],
  controllers: [RootAreasController],
  providers: [RootAreasService],
  exports: [RootAreasService],
})
export class RootAreasModule {}
