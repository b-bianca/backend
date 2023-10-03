import { Test, TestingModule } from '@nestjs/testing';
import { InternalServerErrorException } from '@nestjs/common';
import { AffiliateService } from './affiliate.service';
import { UploadFile } from '../upload/entities/upload.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AffiliateService', () => {
  let service: AffiliateService;
  let affiliateRepository: Repository<UploadFile>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AffiliateService,
        {
          provide: getRepositoryToken(UploadFile),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AffiliateService>(AffiliateService);
    affiliateRepository = module.get<Repository<UploadFile>>(getRepositoryToken(UploadFile));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findRegisterByAffiliate', () => {
    it('should find and return records by affiliate with ILike', async () => {
      const seller = 'mArIa CaNdIdA';

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

      affiliateRepository.find = jest.fn().mockResolvedValue(mockRecords);

      const result = await service.findRegisterByAffiliate(seller);

      expect(result).toEqual(mockRecords);
      expect(affiliateRepository.find).toHaveBeenCalledWith(
        expect.objectContaining({
            where: expect.arrayContaining([
                expect.objectContaining({
                    seller: expect.objectContaining({
                        _type: 'ilike',
                        _value: `%${seller}%`, 
                    })
                })
            ])
        })
      );
    });

    it('should handle an error when retrieval fails', async () => {
      const seller = 'MARIA CANDIDA';

      affiliateRepository.find = jest.fn().mockRejectedValue(new Error('Failed to retrieve'));

      try {
        await service.findRegisterByAffiliate(seller);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error.message).toBe('Failed to retrieve register based on affiliate.');
      }
    });
  });
});
