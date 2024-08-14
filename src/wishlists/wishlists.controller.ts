import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('wishlists')
@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new wishlist' })
  @ApiResponse({ status: 201, description: 'Wishlist created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async create(@Body() createWishlistDto: CreateWishlistDto) {
    try {
      return await this.wishlistsService.create(createWishlistDto);
    } catch (error) {
      throw new HttpException('Failed to create wishlist', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all wishlists' })
  @ApiResponse({ status: 200, description: 'Wishlists retrieved successfully' })
  @ApiResponse({ status: 404, description: 'No wishlists found' })
  async findAll() {
    try {
      const wishlists = await this.wishlistsService.findAll();
      if (!wishlists || wishlists.length === 0) {
        throw new HttpException('No wishlists found', HttpStatus.NOT_FOUND);
      }
      return wishlists;
    } catch (error) {
      throw new HttpException('Failed to retrieve wishlists', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a wishlist by ID' })
  @ApiResponse({ status: 200, description: 'Wishlist retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Wishlist not found' })
  async findOne(@Param('id') id: number) {
    try {
      const wishlist = await this.wishlistsService.findOne(id);
      if (!wishlist) {
        throw new HttpException('Wishlist not found', HttpStatus.NOT_FOUND);
      }
      return wishlist;
    } catch (error) {
      throw new HttpException('Failed to retrieve wishlist', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a wishlist by ID' })
  @ApiResponse({ status: 200, description: 'Wishlist updated successfully' })
  @ApiResponse({ status: 404, description: 'Wishlist not found' })
  async update(@Param('id') id: number, @Body() updateWishlistDto: UpdateWishlistDto) {
    try {
      const updatedWishlist = await this.wishlistsService.update(id, updateWishlistDto);
      if (!updatedWishlist) {
        throw new HttpException('Wishlist not found', HttpStatus.NOT_FOUND);
      }
      return updatedWishlist;
    } catch (error) {
      throw new HttpException('Failed to update wishlist', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a wishlist by ID' })
  @ApiResponse({ status: 200, description: 'Wishlist deleted successfully' })
  @ApiResponse({ status: 404, description: 'Wishlist not found' })
  async remove(@Param('id') id: number) {
    try {
      const result = await this.wishlistsService.remove(id);
      if (!result) {
        throw new HttpException('Wishlist not found', HttpStatus.NOT_FOUND);
      }
      return { message: 'Wishlist deleted successfully' };
    } catch (error) {
      throw new HttpException('Failed to delete wishlist', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
