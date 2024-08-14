import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Brand } from './entities/brand.entity';

@ApiTags('brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new brand' })
  @ApiResponse({ status: 201, description: 'The brand has been successfully created.', type: Brand })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async create(@Body() createBrandDto: CreateBrandDto) {
    try {
      return await this.brandsService.create(createBrandDto);
    } catch (error) {
      throw new HttpException('Error creating brand', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all brands' })
  @ApiResponse({ status: 200, description: 'List of all brands.', type: [Brand] })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async findAll() {
    try {
      return await this.brandsService.findAll();
    } catch (error) {
      throw new HttpException('Error retrieving brands', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a brand by ID' })
  @ApiResponse({ status: 200, description: 'The brand with the specified ID.', type: Brand })
  @ApiResponse({ status: 404, description: 'Brand not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async findOne(@Param('id') id: number) {
    try {
      const brand = await this.brandsService.findOne(id);
      if (!brand) {
        throw new HttpException('Brand not found', HttpStatus.NOT_FOUND);
      }
      return brand;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Error retrieving brand', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a brand by ID' })
  @ApiResponse({ status: 200, description: 'The brand has been successfully updated.', type: Brand })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 404, description: 'Brand not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async update(@Param('id') id: number, @Body() updateBrandDto: UpdateBrandDto) {
    try {
      const updatedBrand = await this.brandsService.update(id, updateBrandDto);
      if (!updatedBrand) {
        throw new HttpException('Brand not found', HttpStatus.NOT_FOUND);
      }
      return updatedBrand;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Error updating brand', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a brand by ID' })
  @ApiResponse({ status: 200, description: 'The brand has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Brand not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async remove(@Param('id') id: number) {
    try {
      const result = await this.brandsService.remove(id);
      if (!result) {
        throw new HttpException('Brand not found', HttpStatus.NOT_FOUND);
      }
      return { message: 'Brand successfully deleted' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Error deleting brand', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
