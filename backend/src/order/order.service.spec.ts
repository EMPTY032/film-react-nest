import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Schedule } from '../repository/entity/schedule.entity';
import { Film } from '../repository/entity/film.entity';

describe('OrderService', () => {
  let service: OrderService;

  const mockFilmRepo = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
  };

  const mockScheduleRepo = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(Film),
          useValue: mockFilmRepo,
        },
        {
          provide: getRepositoryToken(Schedule),
          useValue: mockScheduleRepo,
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
