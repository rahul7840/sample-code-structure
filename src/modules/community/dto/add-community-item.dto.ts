import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsNumber,
  IsEnum,
  IsBoolean,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { ItemTypeEnum } from 'src/model/communities-item-model';

export class CommunityItemDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: 'ID of the community this item belongs to',
    example: 100000,
  })
  community_id: number;

  @IsEnum(ItemTypeEnum)
  @ApiProperty({
    enum: ItemTypeEnum,
    description: 'Type of item — POST, EVENT, or MARKET',
    example: ItemTypeEnum.PULS,
  })
  item_type_enum: ItemTypeEnum;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: 'ID of the user who created the item',
    example: 100000,
  })
  user_id: number;

  // Pulses  dto------------

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: Number,
    description: 'Title',
    example: 'test pulse',
  })
  pulse_title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: Number,
    description: 'description',
    example: 'test pulse description',
  })
  pulse_description: string;

  // community dto------------

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Type of market post (e.g., selling, buying, rent)',
    example: 'selling',
  })
  market_post_type?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Title of the market post',
    example: 'iPhone 14 Pro for sale',
  })
  market_title?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Detailed description of the post',
    example:
      'Lightly used iPhone 14 Pro, 128GB, with original box and charger.',
  })
  market_description?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Category name for the item/service',
    example: 'Electronics',
  })
  market_category_name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Address or location related to the market post',
    example: 'C.G. Road, Ahmedabad',
  })
  market_address?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'Price or amount associated with the market post',
    example: 55000,
  })
  market_amount?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Name of the person or seller',
    example: 'Rahul Sharma',
  })
  market_name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Contact email of the seller',
    example: 'rahul@example.com',
  })
  market_email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Mobile number of the seller',
    example: '9876543210',
  })
  market_mobile_number?: string;
}
