import { ApiProperty } from '@nestjs/swagger';

export class CreateWishlistDto {
    @ApiProperty({
        description: 'ID of the user who wants to add the product to their wishlist',
        example: 'a0eeb9b2-17b5-4f89-9e0c-7e1b89e1e20b'
    })
    user_id: string;

    @ApiProperty({
        description: 'ID of the product to be added to the wishlist',
        example: 'f4e5d6b7-8c9d-4f2b-9a1c-2e3f4g5h6i7j'
    })
    product_id: string;
}
