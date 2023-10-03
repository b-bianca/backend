import { Controller, Get, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionDTO } from './dto/transaction.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('List Data')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get('/')
  @ApiOperation({ summary: "Retrieve all submitted data, or filter data based on a query-param for the date the file was uploaded to the database." })
  @ApiResponse({ status: 200, description: "Array containing the found data." })
  async findAll(@Query('createdAt') createdAt: string): Promise<TransactionDTO[]> {
    const allTransactions = await this.transactionsService.findAllTransactions(createdAt);

    const mappedTransactions = allTransactions.map((transaction) => {
      const result: TransactionDTO = {
        Type: transaction.type,
        DateOfSale: transaction.dateOfSale,
        Product: transaction.product,
        Price: transaction.price,
        Seller: transaction.seller,
        CreatedAt: transaction.createdAt
      }
      return result
    }) 
    return mappedTransactions
  }
}
