import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
    @ApiProperty({
        description: 'Name of the reviewer',
        example: 'John Doe',
    })
    name: string;

    @ApiProperty({
        description: 'ID of the user who wrote the review',
        example: 'a0eeb9b2-17b5-4f89-9e0c-7e1b89e1e20b',
    })
    user_id: string;

    @ApiProperty({
        description: 'Rating given in the review',
        example: 4,
    })
    rated: number;

    @ApiProperty({
        description: 'Comment or text of the review',
        example: 'Great product, highly recommend!',
    })
    comment: string;
}
