import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    await this.checkAlreadyExists(createCategoryDto.name)
    return this.categoryRepository.save(createCategoryDto);
  }

  findAll() {
    return this.categoryRepository.find();
  }

  async findOne(id: number) {
    return await this.getIfNotNull(id);

  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.getIfNotNull(id)
    return this.categoryRepository.update(id, updateCategoryDto);
  }

  async remove(id: number) {
    let category = await this.getIfNotNull(id)
    return this.categoryRepository.remove(category);
  }

  private async checkAlreadyExists(name: string) {
    let category = await this.categoryRepository.findOne({ name });
    if (!!category) {
      throw new BadRequestException(`Category '${name}' already exists!`);
    }
  }

  private async getIfNotNull(id: number) {
    let category = await this.categoryRepository.findOne({ id });
    if (!!!category)
      throw new NotFoundException()
    return category
  }
}
