// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/signin-credentials.dto';
// import { UpdateUserDto } from './dto/signup-credentials.dto';
// import { User } from './entities/user.entity';

// @Controller('users')
// export class UsersController {
//   constructor(private readonly usersService: UsersService) {}

//   @Post()
//   create(@Body() createUserDto: CreateUserDto): Promise<User> {
//     return this.usersService.create(createUserDto);
//   }

  
//   // @Get()
//   // findAll() {
//   //   return this.usersService.findAll();
//   // }

//   @Get(':id')
//   async findUserByID(@Param('id') id: string) {
//     const user = await this.usersService.findUserById(id);
//   }

//   // @Patch(':id')
//   // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
//   //   return this.usersService.update(+id, updateUserDto);
//   // }

//   // @Delete(':id')
//   // remove(@Param('id') id: string) {
//   //   return this.usersService.remove(+id);
//   // }
// }
