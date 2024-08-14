import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateNotifacationDto } from './dto/create-notifacation.dto';
import { UpdateNotifacationDto } from './dto/update-notifacation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './entities/notifacation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotifacationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) { }

  async create(createNotifacationDto: CreateNotifacationDto): Promise<Notification> {
    try {
      const notification = this.notificationRepository.create(createNotifacationDto);
      return await this.notificationRepository.save(notification);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create notification');
    }
  }

  async findAll(): Promise<Notification[]> {
    try {
      const notifications = await this.notificationRepository.find();
      if (notifications.length === 0) {
        throw new NotFoundException('No notifications found');
      }
      return notifications;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch notifications');
    }
  }

  async findOne(id: any): Promise<Notification> {
    try {
      const notification = await this.notificationRepository.findOne({ where: { id } });
      if (!notification) {
        throw new NotFoundException(`Notification with ID ${id} not found`);
      }
      return notification;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch notification');
    }
  }

  async update(id: number, updateNotifacationDto: UpdateNotifacationDto): Promise<Notification> {
    try {
      await this.notificationRepository.update(id, updateNotifacationDto);
      const updatedNotification = await this.findOne(id);
      return updatedNotification;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update notification');
    }
  }

  async remove(id: number): Promise<any> {
    try {
      const notification = await this.findOne(id);
      await this.notificationRepository.remove(notification);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to remove notification');
    }
  }
}
