import { CategoryService } from './../category/category.service';
import { Repository } from 'typeorm';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private categoryService: CategoryService

  ) { }

  async create(createProductDto: CreateProductDto) {
    await this.checkAlreadyExists(createProductDto.name)
    let category = await this.getCategoryIfNotNull(createProductDto.categoryId)
    let product = this.productRepository.create({ ...createProductDto, category })
    return this.productRepository.save(product);
  }

  findAll() {
    return this.productRepository.find({
      join: {
        alias: 'product',
        innerJoinAndSelect: {
          category: 'product.category'
        }
      }
    });
  }

  findOne(id: number) {
    return this.getIfNotNull(id);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.getIfNotNull(id)
    return this.productRepository.update(id, updateProductDto);
  }

  async remove(id: number) {
    let product = await this.getIfNotNull(id)
    return this.productRepository.remove(product);
  }

  private async checkAlreadyExists(name: string) {
    let category = await this.productRepository.findOne({ name });
    if (!!category) {
      throw new BadRequestException(`Product '${name}' already exists!`);
    }
  }

  private async getIfNotNull(id: number) {
    let category = await this.productRepository.findOne({ id });
    if (!!!category)
      throw new NotFoundException()
    return category
  }

  private async getCategoryIfNotNull(categoryId: number) {
    let category = await this.categoryService.findOne(categoryId)
    if (!!!category)
      throw new BadRequestException('Category doesnt exist!')
    return category
  }
}
