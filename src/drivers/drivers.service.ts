import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './driver.entity';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
  ) {}

  findAll(): Promise<Driver[]> {
    return this.driverRepository.find({
      order: { name: 'ASC' },
    });
  }

  async updateAvailability(id: string, isActive: boolean): Promise<Driver> {
    const driver = await this.driverRepository.findOneBy({ id });
    if (!driver) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }
    driver.isActive = isActive;
    return this.driverRepository.save(driver);
  }
}
