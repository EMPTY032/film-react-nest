import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDTO } from './dto/order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from '../films/repository/entity/film.entity';
import { Repository } from 'typeorm';
import { Schedule } from '../films/repository/entity/schedule.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Film) private filmRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async createOrder(tickets: CreateOrderDTO[]) {
    const seatsSet = new Set();

    for (const ticket of tickets) {
      const film = await this.filmRepository.findOne({
        where: { id: ticket.film },
      });

      if (!film) {
        throw new NotFoundException(`Фильм ${ticket.film} не найден`);
      }

      const session = await this.scheduleRepository.findOne({
        where: { id: ticket.session },
      });

      if (!session) {
        throw new NotFoundException(`Сеанс ${ticket.session} не найден`);
      }
      const newSeat = `${ticket.row}:${ticket.seat}`;

      if (seatsSet.has(newSeat)) {
        throw new BadRequestException('Duplicate seats in request');
      }

      seatsSet.add(newSeat);

      session.taken = session.taken || [];

      if (session.taken.includes(newSeat)) {
        throw new Error(`Место ${newSeat} занято`);
      }

      session.taken.push(newSeat);

      await this.filmRepository.save(film);
    }

    return { success: true };
  }
}
