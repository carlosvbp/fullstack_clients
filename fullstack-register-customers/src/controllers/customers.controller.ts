import { CustomerBodyUpdate } from "../interfaces/customers.interface";
import { CustomerService } from "../services/customers.service";
import { Request, Response } from "express";

export class CustomerController {
    constructor(private customerService: CustomerService) { }
    async create(req: Request, res: Response): Promise<Response> {
        const reqBody = req.body
        const newCustomer = await this.customerService.create(reqBody)
        return res.status(201).json(newCustomer)
    }
    async list(req: Request, res: Response): Promise<Response> {
        const customers = await this.customerService.list(res.locals.customer.sub)
        return res.json(customers)
    }

    async update(req: Request, res: Response): Promise<Response> {
        const customerId: any = req.params.id
        const customerData: CustomerBodyUpdate = req.body
        const customerUpdate = await this.customerService.update(customerData, customerId)
        return res.status(200).json(customerUpdate)
    }

    async remove(req: Request, res: Response): Promise<Response> {
        const customerId: any = req.params.id
        await this.customerService.remove(customerId)
        return res.status(204).json()
    }
}

