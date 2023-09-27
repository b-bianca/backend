import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadFile } from './entities/upload.entity'

describe('UploadService', () => {
  let service: UploadService;
  let uploadFileRepository: { create: { mockReturnValue: (arg0: any) => void; }; save: { mockResolvedValue: (arg0: any) => void; mockRejectedValue: (arg0: Error) => void; }; };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UploadService,
        {
          provide: getRepositoryToken(UploadFile),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UploadService>(UploadService);
    uploadFileRepository = module.get(getRepositoryToken(UploadFile));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('saveFile', () => {
    it('should save a file successfully', async () => {
      const fileToSave = new UploadFile();

      uploadFileRepository.create.mockReturnValue(fileToSave);
      uploadFileRepository.save.mockResolvedValue(fileToSave);

      const result = await service.saveFile(fileToSave);

      expect(result).toEqual('Upload completed successfully');
      expect(uploadFileRepository.create).toHaveBeenCalledWith(fileToSave);
      expect(uploadFileRepository.save).toHaveBeenCalledWith(fileToSave);
    });

    it('should throw an error when saving fails', async () => {
      const fileToSave = new UploadFile();

      uploadFileRepository.create.mockReturnValue(fileToSave);
      uploadFileRepository.save.mockRejectedValue(new Error('Failed to save'));

      try {
        await service.saveFile(fileToSave);
        fail('Expected error to be thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error.message).toBe('Failed to save file.');
      }
    });
  });
});
