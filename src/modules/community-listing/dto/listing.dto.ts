import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional } from 'class-validator';

export class ListingFilterDto {
  @ApiProperty({
    type: [Number],
    description: 'community_id',
    example: [100000, 100001, 100002],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  community_id?: number[];

  @ApiProperty({
    type: [Number],
    description: 'Array of Property Category IDs',
    example: [100000, 100001, 100002],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  category_id?: number[];

  @ApiProperty({
    type: [Number],
    description: 'locality data',
    example: [100000, 100001, 100002],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  locality_id?: number[];

  @ApiProperty({
    type: Boolean,
    description: 'Whether property is pre-leased',
    example: true,
    required: false,
  })
  is_nearby?: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'Whether property is pre-leased',
    example: true,
    required: false,
  })
  joined_community?: boolean;

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
  sort_by?: number;

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
