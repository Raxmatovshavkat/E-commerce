import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) { }

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    try {
      const review = this.reviewRepository.create(createReviewDto);
      return await this.reviewRepository.save(review);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create review');
    }
  }

  async findAll(): Promise<Review[]> {
    try {
      return await this.reviewRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch reviews');
    }
  }

  async findOne(id: any): Promise<Review> {
    try {
      const review = await this.reviewRepository.findOne(id);
      if (!review) {
        throw new NotFoundException(`Review with ID ${id} not found`);
      }
      return review;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch review');
    }
  }

  async update(id: any, updateReviewDto: UpdateReviewDto): Promise<Review> {
    try {
      const review = await this.reviewRepository.preload({
        id,
        ...updateReviewDto,
      });

      if (!review) {
        throw new NotFoundException(`Review with ID ${id} not found`);
      }

      return await this.reviewRepository.save(review);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update review');
    }
  }

  async remove(id: any): Promise<any> {
    try {
      const review = await this.reviewRepository.findOne(id);
      if (!review) {
        throw new NotFoundException(`Review with ID ${id} not found`);
      }

      await this.reviewRepository.remove(review);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete review');
    }
  }
}
