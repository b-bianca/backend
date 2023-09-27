import { Module } from '@nestjs/common';
import { ProductorService } from './productor.service';
import { ProductorController } from './productor.controller';
import { UploadFile } from 'src/upload/entities/upload.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UploadFile])],
  controllers: [ProductorController],
  providers: [ProductorService],
})
export class ProductorModule {}
