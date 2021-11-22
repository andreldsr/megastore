import { Warehouse } from './entities/warehouse.entity';
import { Repository } from 'typeorm';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class WarehouseService {

  constructor(
    @InjectRepository(Warehouse)
    private warehouseRepository: Repository<Warehouse>
  ) { }

  async create(createWarehouseDto: CreateWarehouseDto) {
    await this.checkAlreadyExists(createWarehouseDto.name)
    return this.warehouseRepository.save(createWarehouseDto)
  }

  findAll() {
    return this.warehouseRepository.find();
  }

  findOne(id: number) {
    return this.getIfNotNull(id);
  }

  async update(id: number, updateWarehouseDto: UpdateWarehouseDto) {
    await this.getIfNotNull(id)
    return this.warehouseRepository.update(id, updateWarehouseDto);
  }

  async remove(id: number) {
    let warehouse = await this.getIfNotNull(id)
    return this.warehouseRepository.remove(warehouse);
  }

  private async checkAlreadyExists(name: string) {
    let category = await this.warehouseRepository.findOne({ name });
    if (!!category) {
      throw new BadRequestException(`Warehouse '${name}' already exists!`);
    }
  }

  private async getIfNotNull(id: number) {
    let category = await this.warehouseRepository.findOne({ id });
    if (!!!category)
      throw new NotFoundException()
    return category
  }
}
