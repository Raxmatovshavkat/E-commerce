import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFileDto {
    @ApiProperty({
        description: 'The ID of the user associated with the file',
        example: '60b6a8c5e1d3b12a6f8d0a3b',
    })
    @IsNotEmpty()
    @IsString()
    userId: string;

    @ApiProperty({
        description: 'The name of the table associated with the file',
        example: 'users',
    })
    @IsString()
    table_name: string;

    @ApiProperty({
        description: 'The status of the file',
        enum: ['inactive', 'active'],
        example: 'active',
    })
    @IsEnum(['inactive', 'active'])
    status: 'inactive' | 'active';

    @ApiProperty({
        description: 'The name of the file',
        example: 'document.pdf',
    })
    @IsString()
    fileName: string;
}

export class UpdateFileDto {
    @ApiProperty({
        description: 'The status of the file',
        enum: ['inactive', 'active'],
        example: 'active',
    })
    @IsEnum(['inactive', 'active'])
    status: 'inactive' | 'active';

    @ApiProperty({
        description: 'The name of the file',
        example: 'document.pdf',
    })
    @IsString()
    fileName: string;
}
