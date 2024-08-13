import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsUUID } from 'class-validator';

export class CreateDeliveryDto {
    @ApiProperty({
        description: 'The unique identifier of the order',
        example: 'a1b2c3d4-e5f6-7g8h-9i10-j11k12l13m14',
    })
    @IsUUID()
    order_id: string;

    @ApiProperty({
        description: 'The name of the recipient',
        example: 'John Doe',
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'The phone number of the recipient',
        example: '+1234567890',
    })
    @IsString()
    phone: string;

    @ApiProperty({
        description: 'The email address of the recipient',
        example: 'johndoe@example.com',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'The delivery address',
        example: '123 Main Street, Apt 4B',
    })
    @IsString()
    address: string;

    @ApiProperty({
        description: 'The city of the delivery address',
        example: 'New York',
    })
    @IsString()
    city: string;
}
