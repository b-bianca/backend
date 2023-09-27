import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InternalServerErrorException } from '@nestjs/common';
//import  UploadFile  from 'src/upload/entities/upload.entity';
import { UploadFile } from "src/upload/entities/upload.entity"

describe('TransactionsService', () => {
  let service: TransactionsService;
  let transactionRepository: { find: jest.Mock };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        {
          provide: getRepositoryToken(UploadFile),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
    transactionRepository = module.get(getRepositoryToken(UploadFile));
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

      transactionRepository.find.mockResolvedValue(transactionsData);

      const result = await service.findAllTransactions();

      expect(result).toEqual(transactionsData);
      expect(transactionRepository.find).toHaveBeenCalled();
    });

    it('should handle an error when retrieving transactions fails', async () => {
      transactionRepository.find.mockRejectedValue(new Error('Failed to retrieve'));

      try {
        await service.findAllTransactions();
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error.message).toBe('Failed to retrieve transactions.');
      }
    });
  });
});