import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Film, FilmDocument } from '../films/schema/films.schema';
import { Model } from 'mongoose';
import { CreateOrderDTO } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}

  async createOrder(tickets: CreateOrderDTO[]) {
    for (const ticket of tickets) {
      const film = await this.filmModel.findOne({ id: ticket.film });

      if (!film) throw new Error(`Фильм ${ticket.film} не найден`);

      const session = film.schedule.find((s) => s.id === ticket.session);
      if (!session) throw new Error(`Сеанс ${ticket.session} не найден`);

      session.taken = session.taken || [];
      const newSeat = `${ticket.row}:${ticket.seat}`;

      if (session.taken.includes(newSeat))
        throw new Error(`Место ${newSeat} занято`);

      session.taken.push(newSeat);
      film.markModified('schedule');
      await film.save();
    }

    return { success: true };
  }
}
