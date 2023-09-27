// import { EntityRepository, Repository } from "typeorm";
// import { ConflictException, InternalServerErrorException } from "@nestjs/common";
// import * as bcrypt from 'bcrypt'

// import { SignupCredentialsDto } from "./dto/signup-credentials.dto";
// import { SignInCredentialsDto } from "./dto/signin-credentials.dto";
// import { User } from "./entities/user.entity";
// import { UserInfo } from "../../user/entity/user-info.entity";
// import { JwtPayload } from "../interface/jwt-payload.interface";


// export class UserRepository extends Repository<User> {
//     async signUp(signupCredentialsDto: SignupCredentialsDto): Promise<{ message: string }> {
//         const { name, email, password } = signupCredentialsDto

//         const salt = await bcrypt.genSalt()
//         const user = new User()
//         user.name = name
//         user.email = email
//         user.password = await this.hashPassword(password, salt)
        
//         try {
//             const user = new User()
//             await user.save()

//             return { message: 'User successfully created !' }
//         } catch (error) {
//             if (error.code === '409') {
//                 throw new ConflictException('Username already exists')
//             } else {
//                 throw new InternalServerErrorException()
//             }
//         }
//     }

//     async validateUserPassword(signinCredentialDto: SignInCredentialsDto, salt: string): Promise <JwtPayload> {
//         const { email, password } = signinCredentialDto
//         const auth = await this.findOne({ email })

//         if (auth && await auth.validatePassword(password, salt)) {
//             return {
//                 name: auth.name,
//             }
//         } else {
//             return null
//         }
//     }

//     private async hashPassword(password: string, salt: string): Promise<string>{
//         return bcrypt.hash(password, salt)
//     }
// }