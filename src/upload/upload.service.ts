import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadFile } from './entities/upload.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(UploadFile)
    private uploadFileRepository: Repository<UploadFile>,
  ) {}
  async saveFile(file: UploadFile): Promise<string> {
    try {
      const newRegister = this.uploadFileRepository.create(file)
      await this.uploadFileRepository.save(newRegister)
      return  'Upload completed successfully';
    } catch (error) {
      throw new InternalServerErrorException('Failed to save file.');
    }
  }
}
