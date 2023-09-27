import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

describe('UploadController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [UploadController],
      providers: [UploadService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return a success message on file upload', async () => {
    const response = await request(app.getHttpServer())
      .post('/upload')
      .attach('file', 'desafio-programacao-fullstack-1.2.0/sales.txt'); 

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Upload completed successfully' });
  });
});