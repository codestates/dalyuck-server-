import { Injectable } from '@nestjs/common';
import { Calendar } from './calendar.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CalendarRepository } from './calendar.repository';
import { CreateCalendarDto } from './dto/create-calendar.dto';

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(CalendarRepository)
    private calendarRepository: CalendarRepository
  ) {}

  async createCalendar(createCalendarDto: CreateCalendarDto): Promise<Calendar> {
    return this.calendarRepository.createCalendar(createCalendarDto);
  }

  async updateCalendar(
    calendarId: number,
    calendarName? : string,
    description? : string,
    colour? : string
  ): Promise<Calendar> {
    return this.calendarRepository.updateCalendar(calendarId, calendarName, description, colour);
  }
}