import { Injectable, InternalServerErrorException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadFile } from '../upload/entities/upload.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(UploadFile)
    private transactionRepository: Repository<UploadFile>,
  ) {}

  async findAllTransactions(@Query('createdAt') createdAt: string | null): Promise<UploadFile[]> {
    try {
      let query = this.transactionRepository.createQueryBuilder('transaction');

      if (createdAt) {
        query = query.where('transaction.createdAt = :createdAt', { createdAt });
      }

      const transactions = await query.getMany();
      return transactions;
  
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve transactions.');
    }
  }
}
