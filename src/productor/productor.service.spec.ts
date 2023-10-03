import { Test, TestingModule } from '@nestjs/testing';
import { InternalServerErrorException } from '@nestjs/common';
import { ProductorService } from './productor.service';
import { UploadFile } from '../upload/entities/upload.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ProductorService', () => {
  let service: ProductorService;
  let productorRepository: Repository<UploadFile>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductorService,
        {
          provide: getRepositoryToken(UploadFile),
          useClass: Repository, 
        },
      ],
    }).compile();

    service = module.get<ProductorService>(ProductorService);
    productorRepository = module.get<Repository<UploadFile>>(getRepositoryToken(UploadFile));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findRegisterByProducer', () => {
    it('should find and return records by producer', async () => {
      const seller = 'MARIA CANDIDA';

      const mockRecords: UploadFile[] = [
        {
            id: 1,
            type: "1",
            dateOfSale: "2021-12-03T11:46:02-03:00",
            product: "DOMINANDO INVESTIMENTOS",
            price: 500,
            seller: "MARIA CANDIDA",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 2,
            type: "1",
            dateOfSale: "2021-12-03T11:46:02-03:00",
            product: "DOMINANDO INVESTIMENTOS",
            price: 1.500,
            seller: "MARIA CANDIDA",
            createdAt: new Date(),
            updatedAt: new Date()
        },
      ];

      productorRepository.find = jest.fn().mockResolvedValue(mockRecords);

      const result = await service.findRegisterByProducer(seller);

      expect(result).toEqual(mockRecords);
      expect(productorRepository.find).toHaveBeenCalledWith({
        where: expect.arrayContaining([
            expect.objectContaining({
                seller: expect.objectContaining({
                    _type: 'like',
                    _value: `%${seller}%`, 
                })
            })
        ])
      });
    });

    it('should handle an error when retrieval fails', async () => {
      const seller = 'MARIA CANDIDA';

      productorRepository.find = jest.fn().mockRejectedValue(new Error('Failed to retrieve'));

      try {
        await service.findRegisterByProducer(seller);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error.message).toBe('Failed to retrieve register based on productor.');
      }
    });
  });
});
