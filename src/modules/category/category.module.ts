import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryModel } from 'src/model/category-model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([CategoryModel])],
  providers: [CategoryService],
  controllers: [CategoryController]
})
export class CategoryModule {}
