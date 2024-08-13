import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateNotifacationDto {

    @ApiProperty({
        description: 'The unique identifier of the user',
        example: 'a1b2c3d4-e5f6-7g8h-9i10-j11k12l13m14',
    })
    @IsUUID()
    user_id: string;

    @ApiProperty({
        description: 'The title of the notification',
        example: 'Important Update',
    })
    @IsString()
    title: string;

    @ApiProperty({
        description: 'The content of the notification',
        example: 'Your order has been shipped.',
    })
    @IsString()
    content: string;
}
