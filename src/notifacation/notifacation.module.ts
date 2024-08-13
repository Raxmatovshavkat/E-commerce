import { Module } from '@nestjs/common';
import { NotifacationService } from './notifacation.service';
import { NotifacationController } from './notifacation.controller';

@Module({
  controllers: [NotifacationController],
  providers: [NotifacationService],
})
export class NotifacationModule {}
