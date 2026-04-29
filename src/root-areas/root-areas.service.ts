import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RootArea } from './root-area.entity';

@Injectable()
export class RootAreasService {
  constructor(
    @InjectRepository(RootArea)
    private readonly rootAreaRepository: Repository<RootArea>,
  ) {}

  findAll(): Promise<RootArea[]> {
    return this.rootAreaRepository.find({
      order: { name: 'ASC' },
    });
  }
}