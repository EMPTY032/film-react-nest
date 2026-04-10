import { Injectable } from '@nestjs/common';
import { FilmRepository } from '../repository/film.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from './entity/film.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film) private filmRepository: Repository<Film>,
  ) {}

  async getFilms(): Promise<Film[]> {
    return this.filmRepository.find({ relations: ['schedules'] });
  }

  async getFilmById(id) {
    if (!id) {
      throw new Error('передайте id');
    }
    return this.filmRepository.findOne({
      where: { id: id },
      relations: ['schedules'],
    });
  }
}
