import { Module } from '@nestjs/common';
import { NotifacationService } from './notifacation.service';
import { NotifacationController } from './notifacation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notifacation.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Notification])],
  controllers: [NotifacationController],
  providers: [NotifacationService],
})
export class NotifacationModule {}
