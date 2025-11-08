import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export interface IQuestions {
  question_description: string;
  is_mandatory: boolean;
}

export interface IFile {
  field_name: string;
  original_file_name: string;
  encoding: string;
  mimetype: string;
  destination: string;
  file_name: string;
  file_path: string;
  size: number;
}

export class AddCommunityDto {
  @IsNotEmpty({ message: 'Community name is required' })
  @IsString({ message: 'Community name must be a string' })
  @ApiProperty({ description: 'Community name', example: 'Tech Innovators' })
  community_name: string;

  @IsNotEmpty({ message: 'Community description is required' })
  @IsString({ message: 'Community description must be a string' })
  @ApiProperty({
    description: 'Community description',
    example: 'A community for tech enthusiasts to share ideas and innovations.',
  })
  community_description: string;

  @IsNotEmpty({ message: 'Locality id is required' })
  @IsString({ message: 'Locality id must be a string' })
  @ApiProperty({ description: 'Locality id', example: 'loc_12345' })
  locality_id: string;

  @IsNotEmpty({ message: 'Category id is required' })
  @IsString({ message: 'Category id must be a string' })
  @ApiProperty({ description: 'Category id', example: 'cat_67890' })
  category_id: string;

  @IsNotEmpty({ message: 'Status enum is required' })
  @IsString({ message: 'Status enum must be a string' })
  @ApiProperty({ description: 'DRAFT, ACTIVE, INACTIVE', example: 'ACTIVE' })
  status_enum: string;

  @IsNotEmpty({ message: 'Manager id is required' })
  @IsString({ message: 'Manager id must be a string' })
  @ApiProperty({ description: 'Manager id', example: 'user_12345' })
  manager_id: string;

  @ApiProperty({
    description: 'List of questions',
    example: [
      { question_description: 'What is your age?', is_mandatory: true },
    ],
  })
  questions: IQuestions[];

  @IsNotEmpty({ message: 'Banner image is required' })
  @IsString({ message: 'Banner image must be a string' })
  @ApiProperty({
    description: 'Banner image',
    example: '12342',
  })
  banner_image: IFile;
}
