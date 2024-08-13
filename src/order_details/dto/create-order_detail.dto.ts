import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDetailDto {

    @ApiProperty({
        description: 'The unique identifier of the order',
        example: 'a1b2c3d4-e5f6-7g8h-9i10-j11k12l13m14',
    })
    order_id: string;

    @ApiProperty({
        description: 'The unique identifier of the product',
        example: 'b2c3d4e5-f6g7-8h9i-10j1-k12l13m14n15',
    })
    product_id: string;

    @ApiProperty({
        description: 'The size of the product',
        example: 'M',
    })
    size: string;

    @ApiProperty({
        description: 'The quantity of the product ordered',
        example: 2,
    })
    quantity: number;

    @ApiProperty({
        description: 'The price of a single unit of the product',
        example: 15.99,
    })
    singleprice: number;

    @ApiProperty({
        description: 'The total price for the order detail',
        example: 31.98,
    })
    totalprice: number;
}
