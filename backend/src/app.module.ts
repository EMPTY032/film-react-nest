import { Module } from '@nestjs/common';
import {ServeStaticModule} from "@nestjs/serve-static";
import {ConfigModule} from "@nestjs/config";
import * as path from "node:path";

import {configProvider} from "./app.config.provider";
import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';
import { Server } from 'node:http';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/afisha"),
	ConfigModule.forRoot({
          isGlobal: true,
          cache: true
      }),
	FilmsModule,
	OrderModule,
      // @todo: Добавьте раздачу статических файлов из public
      ServeStaticModule.forRoot({
        rootPath: path.join(__dirname, "..", "public"),
        serveRoot: "/content/afisha/"
      })
  ],
  controllers: [],
  providers: [configProvider],
})
export class AppModule {}
