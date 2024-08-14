import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order_detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order_detail.dto';
import { OrderDetail } from './entities/order_detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
  ) {}

  async create(createOrderDetailDto: CreateOrderDetailDto): Promise<OrderDetail> {
    try {
      const orderDetail = this.orderDetailRepository.create(createOrderDetailDto);
      return await this.orderDetailRepository.save(orderDetail);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create order detail');
    }
  }

  async findAll(): Promise<OrderDetail[]> {
    try {
      const orderDetails = await this.orderDetailRepository.find();
      if (orderDetails.length === 0) {
        throw new NotFoundException('No order details found');
      }
      return orderDetails;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch order details');
    }
  }

  async findOne(id: any): Promise<OrderDetail> {
    try {
      const orderDetail = await this.orderDetailRepository.findOne({ where: { id } });
      if (!orderDetail) {
        throw new NotFoundException(`Order detail with ID ${id} not found`);
      }
      return orderDetail;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch order detail');
    }
  }

  async update(id: number, updateOrderDetailDto: UpdateOrderDetailDto): Promise<OrderDetail> {
    try {
      await this.orderDetailRepository.update(id, updateOrderDetailDto);
      const updatedOrderDetail = await this.findOne(id);
      return updatedOrderDetail;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update order detail');
    }
  }

  async remove(id: number): Promise<any> {
    try {
      const orderDetail = await this.findOne(id);
      await this.orderDetailRepository.remove(orderDetail);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to remove order detail');
    }
  }
}
