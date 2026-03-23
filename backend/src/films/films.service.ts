import { Injectable } from '@nestjs/common';
import { FilmRepository } from '../repository/film.repository';

@Injectable()
export class FilmsService {
  constructor(private filmRepository: FilmRepository) {}

  async getFilms() {
    return this.filmRepository.findAll();
  }

  async getFilmById(id) {
    if (!id) {
      throw new Error('передайте id');
    }
    return this.filmRepository.findById(id);
  }
}
