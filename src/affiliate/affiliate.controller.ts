import { Controller, Get,BadRequestException, Query } from '@nestjs/common';
import { AffiliateService } from './affiliate.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Affiliate Data')
@Controller('affiliate')
export class AffiliateController {
  constructor(private readonly affiliateService: AffiliateService) {}

  @Get('/balance')
  @ApiOperation({ summary: "Returns the final balance of the affiliate." })
  @ApiResponse({ status: 200, description: "Message with the affiliate's balance." })
  async finalBalance(@Query('seller') seller: string): Promise<string> {
    if (!seller) {
      throw new BadRequestException('Seller parameter is required.');
    }
     const listTransactions = await this.affiliateService.findRegisterByAffiliate(seller);
     let balance = 0

     for (const item of listTransactions) {
      if (item.type == '4') {
        balance += parseFloat(item.price.toString())
      } else if (item.type == '1' || item.type == '3'){
        return `The ${seller} is an affiliate, not a productor`
      }
     }
     console.log(balance)

     return `The ${seller} affiliate's final balance is R$ ${balance.toFixed(2)}`
  }
}
