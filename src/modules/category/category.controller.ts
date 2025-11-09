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
import { Readable } from 'stream';
import dotenv from 'dotenv';
import cloudinary from '../utils/cloudinary.config';

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

  @Get('check')
  @ApiTags('Files')
  async check() {
    console.log(
      'process.env.CLOUDINARY_CLOUD_NAME',
      process.env.CLOUDINARY_CLOUD_NAME,
    );
    console.log(
      'process.env.CLOUDINARY_API_KEY',
      process.env.CLOUDINARY_API_KEY,
    );
    console.log(
      'process.env.CLOUDINARY_API_SECRET',
      process.env.CLOUDINARY_API_SECRET,
    );

    return { s: 'success' };
  }

  @Post('cloudinary-files')
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
      limits: {
        fileSize: 500 * 1024 * 1024, // 500MB limit
      },
    }),
  )
  async uploadFilesCloudinary(@Response() res, @Request() req) {
    try {
      const inputFiles = req.files as any[];
      const finalFiles = [];

      for (const file of inputFiles) {
        try {
          // Upload to Cloudinary
          const uploadResult = await this.uploadToCloudinary(file);

          // Save to database
          const mediaRecord = await MediaModel.create({
            size: file.size,
            file_path: uploadResult.secure_url,
            original_file_name: file.originalname,
            mimetype: file.mimetype,
            file_name: uploadResult.public_id,
            cloudinary_public_id: uploadResult.public_id,
            created_at: new Date(),
            updated_at: new Date(),
          });

          finalFiles.push({
            media_id: Number(mediaRecord.media_id),
            fieldname: file.fieldname,
            originalname: file.originalname,
            encoding: file.encoding,
            mimetype: file.mimetype,
            filename: uploadResult.public_id,
            path: uploadResult.secure_url,
            url: uploadResult.secure_url,
            size: file.size,
            cloudinary_public_id: uploadResult.public_id,
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

  // Helper method to upload to Cloudinary
  private uploadToCloudinary(file: Express.Multer.File): Promise<any> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto', // Automatically detect file type
          folder: 'uploads', // Optional: organize in folders
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      // Convert buffer to stream and pipe to Cloudinary
      const bufferStream = Readable.from(file.buffer);
      bufferStream.pipe(uploadStream);
    });
  }
}
