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
import { ApiBody, ApiConsumes, ApiResponse } from '@nestjs/swagger';

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

  @Post('files')
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
    const messages = {
      en: {
        common: {
          files: 'Files uploaded successfully',
          error: 'Failed to process files',
        },
      },
    };

    try {
      const inputFiles = req.files as any[];
      const finalFiles = [];

      for (const file of inputFiles) {
        try {
          // Normalize path
          file.path = file.path.replace(/\\/g, '/');

          // Just add the uploaded file to response - no processing
          finalFiles.push({
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
          // Continue with next file even if one fails
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
