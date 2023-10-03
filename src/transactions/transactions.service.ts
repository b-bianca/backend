import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadFile } from '../upload/entities/upload.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(UploadFile)
    private transactionRepository: Repository<UploadFile>,
  ) {}

  async findAllTransactions(): Promise<UploadFile[]> {
    try {
      const all = await this.transactionRepository.find(); 
      return all
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve transactions.');
    }
  }
}
