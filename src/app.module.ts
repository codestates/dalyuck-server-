import * as Joi from '@hapi/joi';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AttendRequestModule } from './attend-request/attend-request.module';
import { CalendarModule } from './calendar/calendar.module';
import { mailConfig } from './config/mail.config';
import { typeOrmConfig } from './config/typeorm.config';
import { EventModule } from './event/event.module';
import { NotificationModule } from './notification/notification.module';
import { OtherCalendarModule } from './other-calendar/other-calendar.module';
import { OtherEventModule } from './other-event/other-event.module';
import { RequestEmailModule } from './request-email/request-email.module';
import { TodoModule } from './todo/todo.module';
import { TodoListModule } from './todolist/todolist.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(), // env파일에 DATABASE_HOST가 반드시 있어야함
        DATABASE_PORT: Joi.number().default(3305), // env파일에 DATABASE_PORT가 있어야 하지만 없으면 임의로 3305입력
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_USERNAME: Joi.string().required(),
      }),
    }),
    UserModule,
    CalendarModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    EventModule,
    TodoListModule,
    TodoModule,
    MailerModule.forRoot(mailConfig),
    RequestEmailModule,
    OtherCalendarModule,
    OtherEventModule,
    AttendRequestModule,
    NotificationModule,
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: process.env.DATABASE_HOST,
    //   port: Number(process.env.DATABASE_PORT),
    //   username: process.env.DATABASE_USERNAME,
    //   password: process.env.DATABASE_PASSWORD,
    //   database: process.env.DATABASE,
    //   autoLoadEntities: true,
    //   synchronize: true,
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
