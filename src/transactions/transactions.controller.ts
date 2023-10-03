import { Controller, Get } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionDTO } from './dto/transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get('/')
  async findAll(): Promise<TransactionDTO[]> {
    const allTransactions = await this.transactionsService.findAllTransactions();

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
