import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   app.use(cors({
    origin: process.env.FRONTEND_URL,
    optionsSuccessStatus: 200,
  }));

  await app.listen(3000);
}
bootstrap();
