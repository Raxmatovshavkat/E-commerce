import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Delivery } from './entities/delivery.entity'; // Import your Delivery entity or DTO for Swagger

@ApiTags('delivery')
@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new delivery' })
  @ApiResponse({ status: 201, description: 'Delivery successfully created.', type: Delivery }) // Adjust as needed
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async create(@Body() createDeliveryDto: CreateDeliveryDto) {
    try {
      return await this.deliveryService.create(createDeliveryDto);
    } catch (error) {
      throw new HttpException('Error creating delivery', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all deliveries' })
  @ApiResponse({ status: 200, description: 'List of all deliveries.', type: [Delivery] }) // Adjust as needed
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async findAll() {
    try {
      return await this.deliveryService.findAll();
    } catch (error) {
      throw new HttpException('Error retrieving deliveries', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a delivery by ID' })
  @ApiParam({ name: 'id', description: 'Delivery ID', type: Number })
  @ApiResponse({ status: 200, description: 'Delivery with the specified ID.', type: Delivery }) // Adjust as needed
  @ApiResponse({ status: 404, description: 'Delivery not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async findOne(@Param('id') id: number) {
    try {
      const delivery = await this.deliveryService.findOne(id);
      if (!delivery) {
        throw new HttpException('Delivery not found', HttpStatus.NOT_FOUND);
      }
      return delivery;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Error retrieving delivery', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a delivery by ID' })
  @ApiParam({ name: 'id', description: 'Delivery ID', type: Number })
  @ApiResponse({ status: 200, description: 'Delivery successfully updated.', type: Delivery }) // Adjust as needed
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 404, description: 'Delivery not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async update(@Param('id') id: number, @Body() updateDeliveryDto: UpdateDeliveryDto) {
    try {
      const updatedDelivery = await this.deliveryService.update(id, updateDeliveryDto);
      if (!updatedDelivery) {
        throw new HttpException('Delivery not found', HttpStatus.NOT_FOUND);
      }
      return updatedDelivery;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Error updating delivery', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a delivery by ID' })
  @ApiParam({ name: 'id', description: 'Delivery ID', type: Number })
  @ApiResponse({ status: 200, description: 'Delivery successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Delivery not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async remove(@Param('id') id: number) {
    try {
      const result = await this.deliveryService.remove(id);
      if (!result) {
        throw new HttpException('Delivery not found', HttpStatus.NOT_FOUND);
      }
      return { message: 'Delivery successfully deleted' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Error deleting delivery', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
