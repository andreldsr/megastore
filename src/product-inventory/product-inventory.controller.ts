import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductInventoryService } from './product-inventory.service';
import { CreateProductInventoryDto } from './dto/create-product-inventory.dto';
import { UpdateProductInventoryDto } from './dto/update-product-inventory.dto';

@Controller('product-inventory')
export class ProductInventoryController {
  constructor(private readonly productInventoryService: ProductInventoryService) {}

  @Post()
  create(@Body() createProductInventoryDto: CreateProductInventoryDto) {
    return this.productInventoryService.create(createProductInventoryDto);
  }

  @Get()
  findAll() {
    return this.productInventoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productInventoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductInventoryDto: UpdateProductInventoryDto) {
    return this.productInventoryService.update(+id, updateProductInventoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productInventoryService.remove(+id);
  }
}
