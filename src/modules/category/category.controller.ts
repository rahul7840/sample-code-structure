import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { AddCategoryDto } from './dto/add-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('add')
  addCategory(@Body() addCategoryDto: AddCategoryDto) {
    return this.categoryService.addCategory(addCategoryDto);
  }

  @Get('')
  listCategory() {
    return this.categoryService.listCategory();
  }
}
