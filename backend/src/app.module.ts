import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';

import { AppConfig, configProvider } from './app.config.provider';
import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: ['CONFIG'],
      useFactory: (config: AppConfig) => ({
        type: config.database.driver as 'postgres',
        url: config.database.url,
        username: config.database.username,
        password: config.database.password,
        port: 5432,
        database: 'exampledb',
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    FilmsModule,
    OrderModule,
    // @todo: Добавьте раздачу статических файлов из public
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
      serveRoot: '/content/afisha/',
    }),
  ],
  controllers: [],
  providers: [configProvider],
})
export class AppModule {}
