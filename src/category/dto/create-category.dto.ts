import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
    @ApiProperty({
        description: 'The name of the category',
        example: 'Electronics',
    })
    @IsString()
    category_name: string;

    @ApiProperty({
        description: 'The ID of the subcategory',
        example: 1,
    })
    @IsNumber()
    subcategory: number;

    @ApiProperty({
        description: 'A brief description of the category',
        example: 'Category for all electronic devices',
    })
    @IsString()
    description: string;

    @ApiProperty({
        description: 'The icon representing the category',
        example: 'https://example.com/icon.png',
    })
    @IsString()
    icon: string;

    @ApiProperty({
        description: 'The status of the category',
        enum: ['inactive', 'active'],
        example: 'active',
    })
    @IsEnum(['inactive', 'active'])
    status: 'inactive' | 'active';
    
}
