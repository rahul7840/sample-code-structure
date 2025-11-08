import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseInterceptors,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { AddCategoryDto } from './dto/add-category.dto';
import * as multer from 'multer';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MediaModel } from 'src/model/media-model';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('add')
  @ApiTags('Category')
  addCategory(@Body() addCategoryDto: AddCategoryDto) {
    return this.categoryService.addCategory(addCategoryDto);
  }

  @Get('')
  @ApiTags('Category')
  listCategory() {
    return this.categoryService.listCategory();
  }

  @Post('files')
  @ApiTags('Files')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Files uploaded successfully' })
  @ApiResponse({ status: 500, description: 'Error while uploading files' })
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          const baseDir = process.env.UPLOAD_BASE_DIR || 'uploads';
          fs.mkdirSync(baseDir, { recursive: true });
          cb(null, baseDir);
        },
        filename: (req, file, cb) => {
          cb(null, uuidv4() + path.extname(file.originalname));
        },
      }),
      limits: {
        fileSize: 500 * 1024 * 1024, // 500MB limit
      },
    }),
  )
  async uploadFiles(@Response() res, @Request() req) {
    try {
      const inputFiles = req.files as any[];
      const finalFiles = [];

      for (const file of inputFiles) {
        try {
          file.path = file.path.replace(/\\/g, '/');

          const mediaRecord = await MediaModel.create({
            size: file.size,
            file_path: file.path,
            original_file_name: file.originalname,
            mimetype: file.mimetype,
            file_name: file.filename,
            created_at: new Date(),
            updated_at: new Date(),
          });

          finalFiles.push({
            media_id: Number(mediaRecord.media_id),
            fieldname: file.fieldname,
            originalname: file.originalname,
            encoding: file.encoding,
            mimetype: file.mimetype,
            destination: file.destination,
            filename: file.filename,
            path: file.path,
            size: file.size,
          });
        } catch (fileError) {
          console.error(
            `Error processing file ${file.originalname}:`,
            fileError,
          );
        }
      }

      return res.send({
        message: 'success',
        data: { files: finalFiles },
      });
    } catch (err) {
      console.error('Upload error:', err);
      return res.status(500).send({
        message: 'something went wrong while uploading on server',
        error: err.message,
      });
    }
  }
}
