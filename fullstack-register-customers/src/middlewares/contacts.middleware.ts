import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { Contact } from "../entities/Contact.entity"
import AppError from "../errors/AppErrors.error"

export const verifyContactExistsAndIsOwned = async (req: Request, res: Response, next: NextFunction):
    Promise<void> => {
    const contactRepo = AppDataSource.getRepository(Contact)
    const contactId: any = req.params.id
    const customerId = res.locals.userId

    const contact = await contactRepo.findOne({
        where: {
            id: contactId
        },
        relations: {
            customer: true
        }
    })
    if (!contact) throw new AppError("Contact not found", 404)
    return next()
}

