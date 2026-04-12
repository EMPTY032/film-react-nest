import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './repository/entity/film.entity';
import { Schedule } from './repository/entity/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Schedule])],
  controllers: [FilmsController],
  providers: [FilmsService],
})
export class FilmsModule {}
