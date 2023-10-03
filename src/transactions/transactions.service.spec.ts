import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UploadFile } from "../upload/entities/upload.entity"
import { Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let transactionRepository: Repository<UploadFile>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        {
          provide: getRepositoryToken(UploadFile),
          useValue: {
            createQueryBuilder: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
    transactionRepository = module.get<Repository<UploadFile>>(getRepositoryToken(UploadFile));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllTransactions', () => {
    it('should retrieve all transactions successfully', async () => {
      const transactionsData: UploadFile[] = [
        {
          "id": 1,
          "type": "1",
          "dateOfSale": "2021-12-03T11:46:02-03:00",
          "product": "DOMINANDO INVESTIMENTOS",
          "price": 500,
          "seller": "MARIA CANDIDA",
          "createdAt": new Date(),
          "updatedAt": new Date()
      },
      ];

      const mockQueryBuilder = {
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(transactionsData), // Mock para retorno vazio
      };
      (transactionRepository.createQueryBuilder as jest.Mock).mockReturnValue(mockQueryBuilder);
  
      const result = await service.findAllTransactions(null);
  
      expect(result).toEqual(transactionsData);
      expect(mockQueryBuilder.where).not.toHaveBeenCalled(); // Não deve chamar where
      expect(mockQueryBuilder.getMany).toHaveBeenCalled();
    });

    it('should retrieve transactions filtered by date successfully', async () => {
      const transactionsData: UploadFile[] = [
        {
          "id": 1,
          "type": "1",
          "dateOfSale": "2021-12-03T11:46:02-03:00",
          "product": "DOMINANDO INVESTIMENTOS",
          "price": 500,
          "seller": "MARIA CANDIDA",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
      ];

      const mockQueryBuilder = {
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(transactionsData),
      };
      (transactionRepository.createQueryBuilder as jest.Mock).mockReturnValue(mockQueryBuilder);
  
      const result = await service.findAllTransactions('2021-12-03');
  
      expect(result).toEqual(transactionsData);
      expect(mockQueryBuilder.where).toHaveBeenCalledWith('transaction.createdAt = :createdAt', {
        createdAt: '2021-12-03',
      });
      expect(mockQueryBuilder.getMany).toHaveBeenCalled();
    });

    it('should handle an error when retrieving transactions fails', async () => {
      const mockQueryBuilder = {
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockRejectedValue(new Error('Failed to retrieve')), // Mock para lançar um erro
      };
      (transactionRepository.createQueryBuilder as jest.Mock).mockReturnValue(mockQueryBuilder);
  
      try {
        await service.findAllTransactions('2021-12-03');
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error.message).toBe('Failed to retrieve transactions.');
      }
    });
   });
});