import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { TSKVLogger } from './logger/tskv.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.setGlobalPrefix('api/afisha', {
    exclude: ['/content/afisha/(.*)'],
  });
  app.enableCors();
  app.useLogger(new TSKVLogger());
  await app.listen(3000);
}
bootstrap();
