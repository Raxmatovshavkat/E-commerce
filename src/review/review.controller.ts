import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('review')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new review' })
  @ApiResponse({ status: 201, description: 'Review created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async create(@Body() createReviewDto: CreateReviewDto) {
    try {
      return await this.reviewService.create(createReviewDto);
    } catch (error) {
      throw new HttpException('Failed to create review', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all reviews' })
  @ApiResponse({ status: 200, description: 'Reviews retrieved successfully' })
  @ApiResponse({ status: 404, description: 'No reviews found' })
  async findAll() {
    try {
      const reviews = await this.reviewService.findAll();
      if (!reviews || reviews.length === 0) {
        throw new HttpException('No reviews found', HttpStatus.NOT_FOUND);
      }
      return reviews;
    } catch (error) {
      throw new HttpException('Failed to retrieve reviews', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific review by ID' })
  @ApiResponse({ status: 200, description: 'Review retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Review not found' })
  async findOne(@Param('id') id: number) {
    try {
      const review = await this.reviewService.findOne(id);
      if (!review) {
        throw new HttpException('Review not found', HttpStatus.NOT_FOUND);
      }
      return review;
    } catch (error) {
      throw new HttpException('Failed to retrieve review', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing review by ID' })
  @ApiResponse({ status: 200, description: 'Review updated successfully' })
  @ApiResponse({ status: 404, description: 'Review not found' })
  async update(@Param('id') id: number, @Body() updateReviewDto: UpdateReviewDto) {
    try {
      const updatedReview = await this.reviewService.update(id, updateReviewDto);
      if (!updatedReview) {
        throw new HttpException('Review not found', HttpStatus.NOT_FOUND);
      }
      return updatedReview;
    } catch (error) {
      throw new HttpException('Failed to update review', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a review by ID' })
  @ApiResponse({ status: 200, description: 'Review deleted successfully' })
  @ApiResponse({ status: 404, description: 'Review not found' })
  async remove(@Param('id') id: number) {
    try {
      const result = await this.reviewService.remove(id);
      if (!result) {
        throw new HttpException('Review not found', HttpStatus.NOT_FOUND);
      }
      return { message: 'Review deleted successfully' };
    } catch (error) {
      throw new HttpException('Failed to delete review', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
