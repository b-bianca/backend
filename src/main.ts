import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Producer Affiliate API')
  .setDescription('This API handles file uploads, normalizes incoming data, and manages the relationships between producers, affiliates, and sales.')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

   app.use(cors({
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200,
  }));

  await app.listen(3000);
}
bootstrap();
