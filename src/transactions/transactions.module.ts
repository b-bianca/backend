import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadFile } from 'src/upload/entities/upload.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UploadFile])],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
