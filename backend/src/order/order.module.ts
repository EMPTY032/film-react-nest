import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { FilmsModule } from '../films/films.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from '../films/entity/film.entity';
import { Schedule } from '../films/entity/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Schedule])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
