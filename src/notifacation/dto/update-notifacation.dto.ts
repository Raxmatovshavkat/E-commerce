import { PartialType } from '@nestjs/mapped-types';
import { CreateNotifacationDto } from './create-notifacation.dto';

export class UpdateNotifacationDto extends PartialType(CreateNotifacationDto) {}
