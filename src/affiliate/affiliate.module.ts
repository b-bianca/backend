import { Module } from '@nestjs/common';
import { AffiliateService } from './affiliate.service';
import { AffiliateController } from './affiliate.controller';
import { UploadFile } from 'src/upload/entities/upload.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UploadFile])],
  controllers: [AffiliateController],
  providers: [AffiliateService],
})
export class AffiliateModule {}
