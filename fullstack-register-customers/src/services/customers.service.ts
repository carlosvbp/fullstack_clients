import { AppDataSource } from "../data-source";
import { Customer } from "../entities/Customer.entity";
import { CustomerBodyUpdate, CustomerCreate, CustomerReturn } from "../interfaces/customers.interface";
import { hash } from "bcryptjs"
import { customerReturnContactSchema, customerReturnSchema } from "../schemas/customers.schema";
import AppError from "../errors/AppErrors.error";

export class CustomerService {
    async create(data: CustomerCreate): Promise<CustomerReturn> {
        const { fullname, email, password, phone } = data
        const customerRepo = AppDataSource.getRepository(Customer)
        const foundCustomer = await customerRepo.findOneBy({ email })

        if (foundCustomer) throw new AppError("Email already exists.", 409)

        const hashedPassword = await hash(password, 10)
        const customer = customerRepo.create({
            fullname, email, password: hashedPassword, phone
        })
        await customerRepo.save(customer)
        return customerReturnSchema.parse(customer)
    }


    async list(customerId: number): Promise<CustomerReturn> {
        const customerRepo = AppDataSource.getRepository(Customer)
        const customer = await customerRepo.findOne({
            where:
                { id: customerId },
            relations: {
                contacts: true
            }
        })
        return customerReturnContactSchema.parse(customer)
    }

    async update(data: CustomerBodyUpdate, customerId: number): Promise<CustomerReturn> {
        const customerRepo = AppDataSource.getRepository(Customer)
        const foundCustomer = await customerRepo.findOneBy({ id: customerId })
        const customerUpdate = customerRepo.create({
            ...foundCustomer, ...data
        })
        await customerRepo.save(customerUpdate)
        return customerReturnSchema.parse(customerUpdate)
    } 

    async remove(customerId: number): Promise<void> {
        const customerRepo = AppDataSource.getRepository(Customer)
        const foundCustomer = await customerRepo.findOneBy({ id: customerId })

        if (!foundCustomer) throw new AppError("Customer not found", 404)

        await customerRepo.remove(foundCustomer)
    }
}

