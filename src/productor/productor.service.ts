import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UploadFile } from 'src/upload/entities/upload.entity';
import { ILike, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductorService {
  constructor(
    @InjectRepository(UploadFile)
    private productorRepository: Repository<UploadFile>,
  ) {}
  async findRegisterByProducer(seller: string): Promise<UploadFile[]> {
    try {
      const sanitizedSearchTerm = `%${seller}%`;
      const listByProductor = await this.productorRepository.find({where: [
        { seller: Like(sanitizedSearchTerm) },
        { seller: ILike(sanitizedSearchTerm) }, 
      ], })
      return listByProductor
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve register based on productor.');
    }
  }
}
