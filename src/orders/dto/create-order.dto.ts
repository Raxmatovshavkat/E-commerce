import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {

    @ApiProperty({
        description: 'The unique identifier of the user placing the order',
        example: 'a1b2c3d4-e5f6-7g8h-9i10-j11k12l13m14',
    })
    user_id: string;

    @ApiProperty({
        description: 'The unique identifier for the payment',
        example: 'p1q2r3s4-t5u6-v7w8-x9y0-z1a2b3c4d5e6',
    })
    payment_id: string;

    @ApiProperty({
        description: 'The type of payment used for the order',
        example: 'credit_card',
    })
    payment_type: string;

    @ApiProperty({
        description: 'The amount being paid for the order',
        example: 99.99,
    })
    paying_amount: number;

    @ApiProperty({
        description: 'The coupon code applied to the order, if any',
        example: 'SUMMER2024',
    })
    coupon: string;

    @ApiProperty({
        description: 'The quantity of items in the order',
        example: 3,
    })
    quantity: number;

    @ApiProperty({
        description: 'The subtotal amount of the order before tax and discounts',
        example: '79.99',
    })
    subtotal: string;

    @ApiProperty({
        description: 'The total amount of the order including tax and discounts',
        example: 99.99,
    })
    total: number;

    @ApiProperty({
        description: 'The current status of the order',
        enum: ['inactive', 'active'],
        example: 'active',
    })
    status: 'inactive' | 'active';

    @ApiProperty({
        description: 'The status code of the order',
        example: 200,
    })
    status_code: number;
}
