import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { NotifacationService } from './notifacation.service';
import { CreateNotifacationDto } from './dto/create-notifacation.dto';
import { UpdateNotifacationDto } from './dto/update-notifacation.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('notifications')
@Controller('notifications')
export class NotifacationController {
  constructor(private readonly notifacationService: NotifacationService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new notification' })
  @ApiResponse({ status: 201, description: 'Notification created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  async create(@Body() createNotifacationDto: CreateNotifacationDto) {
    try {
      return await this.notifacationService.create(createNotifacationDto);
    } catch (error) {
      throw new HttpException('Failed to create notification', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all notifications' })
  @ApiResponse({ status: 200, description: 'Notifications retrieved successfully' })
  @ApiResponse({ status: 404, description: 'No notifications found' })
  async findAll() {
    try {
      return await this.notifacationService.findAll();
    } catch (error) {
      throw new HttpException('Failed to retrieve notifications', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a notification by ID' })
  @ApiResponse({ status: 200, description: 'Notification retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Notification not found' })
  async findOne(@Param('id') id: number) {
    try {
      const notification = await this.notifacationService.findOne(id);
      if (!notification) {
        throw new HttpException('Notification not found', HttpStatus.NOT_FOUND);
      }
      return notification;
    } catch (error) {
      throw new HttpException('Failed to retrieve notification', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a notification by ID' })
  @ApiResponse({ status: 200, description: 'Notification updated successfully' })
  @ApiResponse({ status: 404, description: 'Notification not found' })
  async update(@Param('id') id: number, @Body() updateNotifacationDto: UpdateNotifacationDto) {
    try {
      const updatedNotification = await this.notifacationService.update(id, updateNotifacationDto);
      if (!updatedNotification) {
        throw new HttpException('Notification not found', HttpStatus.NOT_FOUND);
      }
      return updatedNotification;
    } catch (error) {
      throw new HttpException('Failed to update notification', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a notification by ID' })
  @ApiResponse({ status: 200, description: 'Notification deleted successfully' })
  @ApiResponse({ status: 404, description: 'Notification not found' })
  async remove(@Param('id') id: number) {
    try {
      const result = await this.notifacationService.remove(id);
      if (!result) {
        throw new HttpException('Notification not found', HttpStatus.NOT_FOUND);
      }
      return { message: 'Notification deleted successfully' };
    } catch (error) {
      throw new HttpException('Failed to delete notification', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
