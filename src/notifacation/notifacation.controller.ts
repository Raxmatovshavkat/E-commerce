import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotifacationService } from './notifacation.service';
import { CreateNotifacationDto } from './dto/create-notifacation.dto';
import { UpdateNotifacationDto } from './dto/update-notifacation.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('notifacation')
@Controller('notifacation')
export class NotifacationController {
  constructor(private readonly notifacationService: NotifacationService) {}

  @Post()
  create(@Body() createNotifacationDto: CreateNotifacationDto) {
    return this.notifacationService.create(createNotifacationDto);
  }

  @Get()
  findAll() {
    return this.notifacationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notifacationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotifacationDto: UpdateNotifacationDto) {
    return this.notifacationService.update(+id, updateNotifacationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notifacationService.remove(+id);
  }
}
