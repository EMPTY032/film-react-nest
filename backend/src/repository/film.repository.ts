import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Film, FilmDocument } from '../films/schema/films.schema';
import { Model } from 'mongoose';

@Injectable()
export class FilmRepository {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}

  async findAll() {
    return await this.filmModel.find();
  }

  async findById(id: string) {
    return await this.filmModel.findOne({ id: id });
  }

  async save(film: FilmDocument) {
    return film.save();
  }
}
