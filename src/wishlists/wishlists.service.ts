import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
  ) { }

  async create(createWishlistDto: CreateWishlistDto): Promise<Wishlist> {
    try {
      const wishlist = this.wishlistRepository.create(createWishlistDto);
      return await this.wishlistRepository.save(wishlist);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create wishlist');
    }
  }

  async findAll(): Promise<Wishlist[]> {
    try {
      return await this.wishlistRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch wishlists');
    }
  }

  async findOne(id: any): Promise<Wishlist> {
    try {
      const wishlist = await this.wishlistRepository.findOne(id);
      if (!wishlist) {
        throw new NotFoundException(`Wishlist with ID ${id} not found`);
      }
      return wishlist;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch wishlist');
    }
  }

  async update(id: any, updateWishlistDto: UpdateWishlistDto): Promise<Wishlist> {
    try {
      const wishlist = await this.wishlistRepository.preload({
        id,
        ...updateWishlistDto,
      });

      if (!wishlist) {
        throw new NotFoundException(`Wishlist with ID ${id} not found`);
      }

      return await this.wishlistRepository.save(wishlist);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update wishlist');
    }
  }

  async remove(id: any): Promise<any> {
    try {
      const wishlist = await this.wishlistRepository.findOne(id);
      if (!wishlist) {
        throw new NotFoundException(`Wishlist with ID ${id} not found`);
      }

      await this.wishlistRepository.remove(wishlist);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete wishlist');
    }
  }
}
