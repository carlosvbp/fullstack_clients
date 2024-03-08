import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./Customer.entity";

@Entity()
export class Contact {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({ length: 100 })
    fullname: string

    @Column({ length: 50, unique: true })
    email: string

    @Column({ unique: true })
    phone: string

    @CreateDateColumn({ type: "date" })
    createdAt: string | Date;

    @ManyToOne(() => Customer)
    customer: Customer
}

