import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) { }

  async create(createBrandDto: CreateBrandDto): Promise<Brand> {
    try {
      const brand = this.brandRepository.create(createBrandDto);
      return await this.brandRepository.save(brand);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create brand');
    }
  }

  async findAll(): Promise<Brand[]> {
    try {
      const brands = await this.brandRepository.find();
      if (brands.length === 0) {
        throw new NotFoundException('No brands found');
      }
      return brands;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch brands');
    }
  }

  async findOne(id: any): Promise<Brand> {
    try {
      const brand = await this.brandRepository.findOne(id);
      if (!brand) {
        throw new NotFoundException(`Brand with ID ${id} not found`);
      }
      return brand;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch brand');
    }
  }

  async update(id: number, updateBrandDto: UpdateBrandDto): Promise<Brand> {
    try {
      await this.brandRepository.update(id, updateBrandDto);
      const updatedBrand = await this.findOne(id);
      return updatedBrand;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update brand');
    }
  }

  async remove(id: number): Promise<any> {
    try {
      const brand = await this.findOne(id);
      await this.brandRepository.remove(brand);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to remove brand');
    }
  }
}
