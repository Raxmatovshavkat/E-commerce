import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new payment' })
  @ApiResponse({ status: 201, description: 'Payment created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    try {
      return await this.paymentService.create(createPaymentDto);
    } catch (error) {
      throw new HttpException('Failed to create payment', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all payments' })
  @ApiResponse({ status: 200, description: 'Payments retrieved successfully' })
  @ApiResponse({ status: 404, description: 'No payments found' })
  async findAll() {
    try {
      const payments = await this.paymentService.findAll();
      if (!payments || payments.length === 0) {
        throw new HttpException('No payments found', HttpStatus.NOT_FOUND);
      }
      return payments;
    } catch (error) {
      throw new HttpException('Failed to retrieve payments', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific payment by ID' })
  @ApiResponse({ status: 200, description: 'Payment retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Payment not found' })
  async findOne(@Param('id') id: number) {
    try {
      const payment = await this.paymentService.findOne(id);
      if (!payment) {
        throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
      }
      return payment;
    } catch (error) {
      throw new HttpException('Failed to retrieve payment', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing payment by ID' })
  @ApiResponse({ status: 200, description: 'Payment updated successfully' })
  @ApiResponse({ status: 404, description: 'Payment not found' })
  async update(@Param('id') id: number, @Body() updatePaymentDto: UpdatePaymentDto) {
    try {
      const updatedPayment = await this.paymentService.update(id, updatePaymentDto);
      if (!updatedPayment) {
        throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
      }
      return updatedPayment;
    } catch (error) {
      throw new HttpException('Failed to update payment', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a payment by ID' })
  @ApiResponse({ status: 200, description: 'Payment deleted successfully' })
  @ApiResponse({ status: 404, description: 'Payment not found' })
  async remove(@Param('id') id: number) {
    try {
      const result = await this.paymentService.remove(id);
      if (!result) {
        throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
      }
      return { message: 'Payment deleted successfully' };
    } catch (error) {
      throw new HttpException('Failed to delete payment', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
