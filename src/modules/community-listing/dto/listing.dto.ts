import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ListingFilterDto {
  @ApiProperty({
    type: String,
    description: 'can be project name and project id ',
    example: 'luxury apartment',
    required: false,
  })
  @IsOptional()
  search_text?: string;

  @ApiProperty({
    type: Number,
    description: 'Property ID',
    example: 101,
    required: false,
  })
  @IsOptional()
  property_id?: number;

  @ApiProperty({
    type: String,
    description: 'City name',
    example: 'Ahmedabad',
    required: false,
  })
  @IsOptional()
  city?: string;

  @ApiProperty({
    type: Number,
    description: 'Minimum asking price',
    example: 5000000,
    required: false,
  })
  asking_price_min?: number;

  @ApiProperty({
    type: Number,
    description: 'Maximum asking price',
    example: 15000000,
    required: false,
  })
  asking_price_max?: number;

  @ApiProperty({
    type: Boolean,
    description: 'Whether property is pre-leased',
    example: true,
    required: false,
  })
  pre_leased?: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'Whether property is active',
    example: true,
    required: false,
  })
  is_active?: boolean;

  @ApiProperty({
    type: Number,
    description: 'Page number for pagination',
    example: 1,
    required: false,
  })
  page_no?: number;

  @ApiProperty({
    type: Number,
    description: 'Records per page',
    example: 10,
    required: false,
  })
  record_per_page?: number;
}
