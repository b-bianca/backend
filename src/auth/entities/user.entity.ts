// import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
// import * as bcrypt from "bcrypt"

// @Entity()
// export class User {
//   @PrimaryGeneratedColumn("uuid")
//   id: string;

//   @Column({ nullable: false, type: 'varchar', length: 200 })
//   name : string;

//   @Column()
//   email: string;

//   @Column({ nullable: false })
//   password: string;

//   @CreateDateColumn()
//   createdAt: Date;

//   @UpdateDateColumn()
//   updatedAt: Date;

//   async validatePassword(password: string, salt: string): Promise<boolean> {
//     const hash = await bcrypt.hash(password, salt)
//     return hash === this.password
//   }
// }


