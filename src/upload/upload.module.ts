import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { UploadFile } from './entities/upload.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UploadFile])],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
