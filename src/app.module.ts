import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { ProductInventoryModule } from './product-inventory/product-inventory.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
@Module({
  imports: [CategoryModule, ProductModule, WarehouseModule, ProductInventoryModule, ConfigModule.forRoot(), TypeOrmModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule { }
