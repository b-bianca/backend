import { IsDateString, IsDecimal, IsNotEmpty } from "class-validator";

export class TransactionDTO {

  @IsNotEmpty()
  Type: string

  @IsNotEmpty()
  DateOfSale: string

  @IsNotEmpty()
  Product: string

  @IsNotEmpty()
  @IsDecimal()
  Price: number

  @IsNotEmpty()
  Seller: string

  @IsNotEmpty()
  @IsDateString()
  CreatedAt: Date
}
