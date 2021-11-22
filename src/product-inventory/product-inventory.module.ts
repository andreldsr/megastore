import { Module } from '@nestjs/common';
import { ProductInventoryService } from './product-inventory.service';
import { ProductInventoryController } from './product-inventory.controller';

@Module({
  controllers: [ProductInventoryController],
  providers: [ProductInventoryService]
})
export class ProductInventoryModule {}
