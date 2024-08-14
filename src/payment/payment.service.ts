import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) { }

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    try {
      const newPayment = this.paymentRepository.create(createPaymentDto);
      return await this.paymentRepository.save(newPayment);
    } catch (error) {
      throw new InternalServerErrorException('Error creating payment');
    }
  }

  async findAll(): Promise<Payment[]> {
    try {
      return await this.paymentRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving payments');
    }
  }

  async findOne(id: any): Promise<Payment> {
    try {
      const payment = await this.paymentRepository.findOne(id);
      if (!payment) {
        throw new NotFoundException(`Payment with ID ${id} not found`);
      }
      return payment;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error retrieving payment');
    }
  }

  async update(id: any, updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
    try {
      const payment = await this.paymentRepository.preload({
        id,
        ...updatePaymentDto,
      });
      if (!payment) {
        throw new NotFoundException(`Payment with ID ${id} not found`);
      }
      return await this.paymentRepository.save(payment);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error updating payment');
    }
  }

  async remove(id: number): Promise<any> {
    try {
      const result = await this.paymentRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Payment with ID ${id} not found`);
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error deleting payment');
    }
  }
}
