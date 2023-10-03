import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Like, Repository } from 'typeorm';
import { UploadFile } from '../upload/entities/upload.entity';

@Injectable()
export class AffiliateService {
  constructor(
    @InjectRepository(UploadFile)
    private affiliateRepository: Repository<UploadFile>,
  ) {}

  async findRegisterByAffiliate(seller: string): Promise<UploadFile[]> {
    try {
      const sanitizedSearchTerm = `%${seller}%`;
      const listByAffiliate = await this.affiliateRepository.find({where: [
        { seller: Like(sanitizedSearchTerm) },
        { seller: ILike(sanitizedSearchTerm) }, 
      ], })
      return listByAffiliate
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve register based on affiliate.');
    }
  }
}
