import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, FilmDocument } from './schema/films.schema';

@Injectable()
export class FilmsService {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}

  async getFilms() {
    return this.filmModel.find();
  }

  async getFilmById(id) {
    if (!id) {
      throw new Error('передайте id');
    }
    return this.filmModel.find({ id: id });
  }
}
