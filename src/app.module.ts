import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/config.type';
import { UploadModule } from './upload/upload.module';
import { TransactionsModule } from './transactions/transactions.module';
import { ProductorModule } from './productor/productor.module';
import { AffiliateModule } from './affiliate/affiliate.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UploadModule,
    TransactionsModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    ProductorModule,
    AffiliateModule,
  ],
})
export class AppModule {}
