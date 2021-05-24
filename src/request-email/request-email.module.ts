import { Module } from '@nestjs/common';
import { RequestEmailService } from './request-email.service';
import { RequestEmailController } from './request-email.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestEmailRepository } from './request-email.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([RequestEmailRepository])
  ],
  providers: [RequestEmailService],
  controllers: [RequestEmailController]
})
export class RequestEmailModule {}
