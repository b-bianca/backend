import { Controller, InternalServerErrorException, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { UploadDTO } from './dto/upload.dto';
import { UploadFile } from './entities/upload.entity';
import {  ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Upload File')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('/')
  @ApiOperation({ summary: "Upload a file to the database and retrieve normalized data." })
  @ApiResponse({ status: 201, description: "Data successfully created in the database." })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file:Express.Multer.File) {

    try {
      const fileContent = await file.buffer.toString();
      const lines = fileContent.split('\n');
      
      const parsedData = this.parseFileData(lines);

      await this.saveDataToDatabase(parsedData);

      return { message: 'Upload completed successfully' };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('An error occurred while processing the file');
    }
  }
  
    private parseFileData(lines: string[]): UploadDTO[] {
      return lines.map((line) => {
        const type = line.substring(0, 1);
        const date = line.substring(1, 26);
        const product = line.substring(26, 56).trim();
        const price = parseFloat(line.substring(56, 66)) / 100;
        const seller = line.substring(66, 86).trim();
  
        return {
          Type: type,
          DateOfSale: date,
          Product: product,
          Price: price,
          Seller: seller,
        };
      });
    }

    private async saveDataToDatabase(data: UploadDTO[]): Promise<void> {
      for (const item of data) {
        const uploadFile = new UploadFile();
        uploadFile.type = item.Type;
        uploadFile.dateOfSale = item.DateOfSale;
        uploadFile.product = item.Product;
        uploadFile.seller = item.Seller;
        uploadFile.price = item.Price;
  
        await this.uploadService.saveFile(uploadFile);
      }
    }
  }


