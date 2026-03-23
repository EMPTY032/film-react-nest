import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDTO } from './dto/order.dto';
import { FilmRepository } from '../repository/film.repository';

@Injectable()
export class OrderService {
  constructor(private filmRepository: FilmRepository) {}

  async createOrder(tickets: CreateOrderDTO[]) {
    const seatsSet = new Set();

    for (const ticket of tickets) {
      const film = await this.filmRepository.findById(ticket.film);

      if (!film) {
        throw new NotFoundException(`Фильм ${ticket.film} не найден`);
      }

      const session = film.schedule.find((s) => s.id === ticket.session);

      if (!session) {
        throw new NotFoundException(`Сеанс ${ticket.session} не найден`);
      }

      session.taken = session.taken || [];
      const newSeat = `${ticket.row}:${ticket.seat}`;

      if (session.taken.includes(newSeat)) {
        throw new Error(`Место ${newSeat} занято`);
      }

      if (seatsSet.has(newSeat)) {
        throw new BadRequestException('Duplicate seats in request');
      }

      seatsSet.add(newSeat);
      session.taken.push(newSeat);

      film.markModified('schedule');
      await this.filmRepository.save(film);
    }

    return { success: true };
  }
}
