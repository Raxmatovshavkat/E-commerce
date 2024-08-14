import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty({
        description: 'The ID of the category the product belongs to',
        example: 'bfe6a4a8-b6b7-4d8a-93e8-d6c6c6e1a7e7',
    })
    category_id: string;

    @ApiProperty({
        description: 'The ID of the brand of the product',
        example: 'a6c0f3b2-4f95-49a5-9f4b-8b0e6a1e1d64',
    })
    brand_id: string;

    @ApiProperty({
        description: 'Name of the product',
        example: 'Ultra HD TV',
    })
    product_name: string;

    @ApiProperty({
        description: 'Unique code for the product',
        example: 'TV-1234',
    })
    product_code: string;

    @ApiProperty({
        description: 'Available quantity of the product',
        example: 50,
    })
    product_quantity: number;

    @ApiProperty({
        description: 'Details or description of the product',
        example: 'A high-definition TV with a sleek design.',
    })
    product_details: string;

    @ApiProperty({
        description: 'Color of the product',
        example: 'Black',
    })
    product_color: string;

    @ApiProperty({
        description: 'Size of the product',
        example: '55 inches',
    })
    product_size: string;

    @ApiProperty({
        description: 'Selling price of the product',
        example: 499.99,
    })
    selling_price: number;


    @ApiProperty({
        description: 'Rating of the product',
        example: 4.5,
    })
    best_rated: number;

    @ApiProperty({
        description: 'Trend or popularity of the product',
        example: 'Best Seller',
    })
    trend: string;

    @ApiProperty({
        description: 'Images associated with the product',
        example: 'http://example.com/image.jpg',
    })
    images: string;

    @ApiProperty({
        description: 'Status of the product',
        enum: ['inactive', 'active'],
        example: 'active',
    })
    status: 'inactive' | 'active';
}
