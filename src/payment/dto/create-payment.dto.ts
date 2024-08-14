import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
    @ApiProperty({ description: 'Type of payment' })
    type: string;

    @ApiProperty({ description: 'Amount of the payment' })
    amount: number;

    @ApiProperty({ description: 'Total amount after payment' })
    total: number;
}
