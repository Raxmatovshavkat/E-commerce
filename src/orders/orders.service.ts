import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) { }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      const order = this.orderRepository.create(createOrderDto);
      return await this.orderRepository.save(order);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create order');
    }
  }

  async findAll(): Promise<Order[]> {
    try {
      const orders = await this.orderRepository.find();
      if (orders.length === 0) {
        throw new NotFoundException('No orders found');
      }
      return orders;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch orders');
    }
  }

  async findOne(id: any): Promise<Order> {
    try {
      const order = await this.orderRepository.findOne({ where: { id } });
      if (!order) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }
      return order;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch order');
    }
  }

  async update(id: any, updateOrderDto: UpdateOrderDto): Promise<Order> {
    try {
      const order = await this.orderRepository.preload({
        id,
        ...updateOrderDto,
      });
      if (!order) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }
      return await this.orderRepository.save(order);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update order');
    }
  }

  async remove(id: number): Promise<any> {
    try {
      const order = await this.findOne(id);
      await this.orderRepository.remove(order);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to remove order');
    }
  }
}
