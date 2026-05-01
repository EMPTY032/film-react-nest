import * as process from 'node:process';

export const configProvider = {
  provide: 'CONFIG',
  useFactory: (): AppConfig => ({
    database: {
      driver: process.env.DATABASE_DRIVER ?? 'postgres',
      url: process.env.DATABASE_URL ?? 'postgres:///',
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      dbname: process.env.DATABASE_NAME,
      dbport: process.env.DATABASE_PORT,
    },
  }),
};

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
  username: string;
  password: string;
  dbname: string;
  dbport: string;
}
