import { Injectable } from '@nestjs/common';
import { AddCategoryDto } from './dto/add-category.dto';
import { CategoryModel } from 'src/model/category-model';
import { InjectModel } from '@nestjs/sequelize';
import { sendBadRequest, sendSuccess } from 'src/utils/response.util';
import * as multer from 'multer';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(CategoryModel)
    private readonly categoryModel: typeof CategoryModel,
  ) {}

  async addCategory(addCategoryDto: AddCategoryDto) {
    try {
      await this.categoryModel.create({
        ...addCategoryDto,
      });
      return sendSuccess('Category added successfully', {});
    } catch (error) {
      return sendBadRequest(error.message);
    }
  }

  async listCategory() {
    try {
      const categories = await this.categoryModel.findAll({
        attributes: ['category_id', 'category_name'],
      });
      return sendSuccess('Category list fetched successfully', categories);
    } catch (error) {
      return sendBadRequest(error.message);
    }
  }

  // async insertInMedia(file: Express.multer.File) {
  //   try {
  //     const media = await MediaModel.create({
  //       size: file.size,
  //       file_path: file.path.replace(/\\/g, '/'),
  //       original_file_name: file.originalname,
  //       mimetype: file.mimetype,
  //       file_name: file.filename,
  //       created_at: new Date(),
  //       updated_at: new Date(),
  //     });
  //     return media;
  //   } catch (error) {
  //     console.error('Error inserting media:', error);
  //     throw new Error('Failed to insert media');
  //   }
  // }
}
