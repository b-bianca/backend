import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Like, Repository } from 'typeorm';
import { UploadFile } from 'src/upload/entities/upload.entity';

@Injectable()
export class AffiliateService {
  constructor(
    @InjectRepository(UploadFile)
    private affiliateRepository: Repository<UploadFile>,
  ) {}

  async findRegisterByProducer(seller: string): Promise<UploadFile[]> {
    try {
      const sanitizedSearchTerm = `%${seller}%`;
      const listByProductor = await this.affiliateRepository.find({where: [
        { seller: Like(sanitizedSearchTerm) },
        { seller: ILike(sanitizedSearchTerm) }, 
      ], })
      return listByProductor
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve register based on productor.');
    }
  }
}
