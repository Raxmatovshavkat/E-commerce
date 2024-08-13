import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateBrandDto {
    @ApiProperty({
        description: 'The name of the brand',
        example: 'Nike',
    })
    @IsString()
    brand_name: string;

    @ApiProperty({
        description: 'The logo of the brand',
        example: 'https://example.com/logo.png',
    })
    @IsString()
    brand_logo: string;
}
