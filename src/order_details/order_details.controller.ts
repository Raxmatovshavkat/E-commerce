import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { OrderDetailsService } from './order_details.service';
import { CreateOrderDetailDto } from './dto/create-order_detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order_detail.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('order-details')
@Controller('order-details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new order detail' })
  @ApiResponse({ status: 201, description: 'Order detail created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async create(@Body() createOrderDetailDto: CreateOrderDetailDto) {
    try {
      return await this.orderDetailsService.create(createOrderDetailDto);
    } catch (error) {
      throw new HttpException('Failed to create order detail', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all order details' })
  @ApiResponse({ status: 200, description: 'Order details retrieved successfully' })
  @ApiResponse({ status: 404, description: 'No order details found' })
  async findAll() {
    try {
      return await this.orderDetailsService.findAll();
    } catch (error) {
      throw new HttpException('Failed to retrieve order details', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific order detail by ID' })
  @ApiResponse({ status: 200, description: 'Order detail retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Order detail not found' })
  async findOne(@Param('id') id: number) {
    try {
      const orderDetail = await this.orderDetailsService.findOne(id);
      if (!orderDetail) {
        throw new HttpException('Order detail not found', HttpStatus.NOT_FOUND);
      }
      return orderDetail;
    } catch (error) {
      throw new HttpException('Failed to retrieve order detail', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing order detail by ID' })
  @ApiResponse({ status: 200, description: 'Order detail updated successfully' })
  @ApiResponse({ status: 404, description: 'Order detail not found' })
  async update(@Param('id') id: number, @Body() updateOrderDetailDto: UpdateOrderDetailDto) {
    try {
      const updatedOrderDetail = await this.orderDetailsService.update(id, updateOrderDetailDto);
      if (!updatedOrderDetail) {
        throw new HttpException('Order detail not found', HttpStatus.NOT_FOUND);
      }
      return updatedOrderDetail;
    } catch (error) {
      throw new HttpException('Failed to update order detail', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order detail by ID' })
  @ApiResponse({ status: 200, description: 'Order detail deleted successfully' })
  @ApiResponse({ status: 404, description: 'Order detail not found' })
  async remove(@Param('id') id: number) {
    try {
      const result = await this.orderDetailsService.remove(id);
      if (!result) {
        throw new HttpException('Order detail not found', HttpStatus.NOT_FOUND);
      }
      return { message: 'Order detail deleted successfully' };
    } catch (error) {
      throw new HttpException('Failed to delete order detail', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
