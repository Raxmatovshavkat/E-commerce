import { Injectable } from '@nestjs/common';
import { CreateNotifacationDto } from './dto/create-notifacation.dto';
import { UpdateNotifacationDto } from './dto/update-notifacation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './entities/notifacation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotifacationService {
  constructor(@InjectRepository(Notification)
  private notificationRepository: Repository<Notification>,){}
  create(createNotifacationDto: CreateNotifacationDto) {
    return 'This action adds a new notifacation';
  }

  findAll() {
    return `This action returns all notifacation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notifacation`;
  }

  update(id: number, updateNotifacationDto: UpdateNotifacationDto) {
    return `This action updates a #${id} notifacation`;
  }

  remove(id: number) {
    return `This action removes a #${id} notifacation`;
  }
}
