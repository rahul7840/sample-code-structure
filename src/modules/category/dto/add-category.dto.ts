import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AddCategoryDto {
    @IsNotEmpty({ message: 'Category name is required' })
    @IsString({ message: 'Category name must be a string' })
    @ApiProperty({ description: 'Category name' })
    category_name: string;
}