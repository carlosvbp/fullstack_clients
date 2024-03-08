import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Contact } from "./Contact.entity";

@Entity()
export class Customer {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({ length: 100 })
    fullname: string

    @Column({ length: 50, unique: true })
    email: string

    @Column({ length: 140 })
    password: string

    @Column({ unique: true })
    phone: string

    @CreateDateColumn({ type: "date" })
    createdAt: string | Date;

    @OneToMany(() => Contact, contact => contact.customer, { onDelete: "CASCADE" })
    contacts: Contact[]
}