// import { IsString, IsEmail, MinLength, MaxLength, Matches } from "class-validator"
// import { ApiProperty } from "@nestjs/swagger"

// export class SignupCredentialsDto {
//     @ApiProperty({ minimum: 3, maximum: 40 })
//     @IsString()
//     @MinLength(3)
//     @MaxLength(40)
//     name: string

//     @ApiProperty({ minimum: 6, maximum: 20 })
//     @IsEmail()
//     @MinLength(6)
//     @MaxLength(20)
//     email: string

//     @ApiProperty({ minimum: 6, maximum: 20, description: 'At least 1 capital, 1 small, 1 special character & 1 number' })
//     @IsString()
//     @MinLength(6)
//     @MaxLength(20)
//     @Matches(
//         /((?=.*\d)|(?=.*\w+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
//         { message: 'Password too weak'}
//     )
//     password: string
// }