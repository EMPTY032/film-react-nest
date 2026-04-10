import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
// import { MongooseModule } from '@nestjs/mongoose';
// import { Film, FilmSchema } from './schema/films.schema';
import { FilmRepository } from '../repository/film.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './entity/film.entity';
import { Schedule } from './entity/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Schedule])],
  controllers: [FilmsController],
  providers: [FilmsService],
})
export class FilmsModule {}
