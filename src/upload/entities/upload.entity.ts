import { Column, Entity, PrimaryGeneratedColumn,  CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class UploadFile {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    type: string;

    @Column()
    dateOfSale: string;

    @Column()
    product: string;

    @Column({type: 'decimal'})
    price: number;

    @Column()
    seller: string

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

