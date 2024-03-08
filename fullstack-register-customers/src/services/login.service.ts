import "dotenv/config"
import { compare } from "bcryptjs"
import { AppDataSource } from "../data-source"
import { Customer } from "../entities/Customer.entity"
import AppError from "../errors/AppErrors.error"
import { CustomerLogin, CustomerWithToken } from "../interfaces/customers.interface"
import { sign } from "jsonwebtoken"

export class LoginService {
    async createToken(data: CustomerLogin): Promise<CustomerWithToken> {
        const { email } = data

        const customerRepo = AppDataSource.getRepository(Customer)
        const customer: Customer | null = await customerRepo.findOneBy({ email })
        if (!customer) { throw new AppError("Invalid credentials", 401) }

        const comparePass = await compare(data.password, customer.password)
        if (!comparePass) throw new AppError("Invalid credentials", 401)

        const token: string = sign(
            { email: customer.email },
            process.env.SECRET_KEY!,
            {
                subject: customer.id.toString(),
                expiresIn: process.env.EXPIRES_IN!
            }
        )
        
        const customerWithToken: CustomerWithToken = {
            ...customer,
            token,
        };

        return customerWithToken
    }
}



