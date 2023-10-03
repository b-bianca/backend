import { Controller, Get,BadRequestException, Query } from '@nestjs/common';
import { AffiliateService } from './affiliate.service';

@Controller('affiliate')
export class AffiliateController {
  constructor(private readonly affiliateService: AffiliateService) {}

  @Get('/balance')
  async finalBalance(@Query('seller') seller: string): Promise<string> {
    if (!seller) {
      throw new BadRequestException('Seller parameter is required.');
    }
     const listTransactions = await this.affiliateService.findRegisterByAffiliate(seller);
     let balance = 0

     for (const item of listTransactions) {
      if (item.type == '4') {
        balance += parseFloat(item.price.toString())
      } 
     }
     console.log(balance)

     return `The ${seller} affiliate's final balance is R$ ${balance.toFixed(2)}`
  }
}
