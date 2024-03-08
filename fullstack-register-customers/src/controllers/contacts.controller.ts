import { ContactBodyUpdate } from "../interfaces/contacts.interface";
import { ContactService } from "../services/contacts.service";
import { Request, Response } from "express";

export class ContactController {
    constructor(private contactService: ContactService) { }
    async create(req: Request, res: Response): Promise<Response> {
        const customerId = res.locals.customer.sub
        console.log(customerId)
        const newContact = await this.contactService.create(req.body, customerId)
        return res.status(201).json(newContact)
    }

    async list(req: Request, res: Response): Promise<Response> {
        const customerId = res.locals.customer.sub
        const contacts = await this.contactService.list(customerId)
        return res.status(200).json(contacts)
    }

    async update(req: Request, res: Response): Promise<Response> {
        const contactId: any = req.params.id
        const contactData: ContactBodyUpdate = req.body
        const contactUpdate = await this.contactService.update(contactData, contactId)
        return res.status(200).json(contactUpdate)
    }

    async remove(req: Request, res: Response): Promise<Response> {
        const contactId: any = req.params.id
        await this.contactService.remove(contactId)
        return res.status(204).json()
    }
}       