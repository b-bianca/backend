import { IsDecimal, IsNotEmpty } from "class-validator";

export class UploadDTO {

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
}