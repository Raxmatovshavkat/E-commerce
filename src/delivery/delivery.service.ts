import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { Delivery } from './entities/delivery.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(Delivery)
    private readonly deliveryRepository: Repository<Delivery>,
  ) { }

  async create(createDeliveryDto: CreateDeliveryDto): Promise<Delivery> {
    try {
      const delivery = this.deliveryRepository.create(createDeliveryDto);
      return await this.deliveryRepository.save(delivery);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create delivery');
    }
  }

  async findAll(): Promise<Delivery[]> {
    try {
      const deliveries = await this.deliveryRepository.find();
      if (deliveries.length === 0) {
        throw new NotFoundException('No deliveries found');
      }
      return deliveries;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch deliveries');
    }
  }

  async findOne(id: any): Promise<Delivery> {
    try {
      const delivery = await this.deliveryRepository.findOne({ where: { id } });
      if (!delivery) {
        throw new NotFoundException(`Delivery with ID ${id} not found`);
      }
      return delivery;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch delivery');
    }
  }

  async update(id: number, updateDeliveryDto: UpdateDeliveryDto): Promise<Delivery> {
    try {
      await this.deliveryRepository.update(id, updateDeliveryDto);
      const updatedDelivery = await this.findOne(id);
      return updatedDelivery;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update delivery');
    }
  }

  async remove(id: number): Promise<any> {
    try {
      const delivery = await this.findOne(id);
      await this.deliveryRepository.remove(delivery);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to remove delivery');
    }
  }
}
