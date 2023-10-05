import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { ProductorService } from './productor.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Productor Data')
@Controller('productor')
export class ProductorController {
  constructor(private readonly productorService: ProductorService) {}

  @Get('/balance')
  @ApiOperation({ summary: "Returns the final balance of the producer." })
  @ApiResponse({ status: 200, description: "Message with the producer's balance." })
  async finalBalance(@Query('seller') seller: string): Promise<string> {
    if (!seller) {
      throw new BadRequestException('Seller parameter is required.');
    }
     const listTransactions = await this.productorService.findRegisterByProducer(seller);
    console.log(listTransactions)
     let balance = 0
     //let type4Found = false

     for (const item of listTransactions) {
      if (item.type == '4') {
        return `The ${seller} is an affiliate, not a productor`
      } else if (item.type == '1' || item.type == '2') {
        balance += parseFloat(item.price.toString())
        console.log(item.price, "price")
      } else if (item.type == '3') {
        balance -= parseFloat(item.price.toString())
      } 
     }
     console.log(balance)

     return `The ${seller} producer's final balance is R$ ${balance.toFixed(2)}`
  }
}
