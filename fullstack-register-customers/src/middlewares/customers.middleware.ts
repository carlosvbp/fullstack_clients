import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { Customer } from "../entities/Customer.entity"
import AppError from "../errors/AppErrors.error"

export const verifyCustomerExistsAndIsOwned = async (req: Request, res: Response, next: NextFunction):
    Promise<void> => {
    const customerRepo = AppDataSource.getRepository(Customer)
    const customerId: number = Number(req.params.id)

    const customer = await customerRepo.findOne({
        where: {
            id: customerId
        }
    })

    if (!customer) throw new AppError("Customer not found", 404)
    return next()
}