// import { IsString, MaxLength, MinLength } from "class-validator"
// import { ApiProperty } from "@nestjs/swagger"

// export class SignInCredentialsDto {
//     @ApiProperty({ minimum: 4, maximum: 20 })
//     @IsString()
//     @MinLength(4)
//     @MaxLength(20)
//     email: string

//     @ApiProperty({ minimum: 6, maximum: 20, description: 'At least 1 capital, 1 small, 1 special character & 1 number' })
//     @IsString()
//     @MinLength(6)
//     @MaxLength(20)
//     password: string
// }