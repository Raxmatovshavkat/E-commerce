import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'The unique identifier of the payment' })
    id: number;

    @Column()
    @ApiProperty({ description: 'Type of payment' })
    type: string;

    @Column('decimal', { precision: 10, scale: 2 })
    @ApiProperty({ description: 'Amount of the payment' })
    amount: number;

    @Column()
    @ApiProperty({ description: 'Total amount after payment' })
    total: number;
}
