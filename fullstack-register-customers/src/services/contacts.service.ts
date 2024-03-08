import { AppDataSource } from "../data-source";
import { Contact } from "../entities/Contact.entity";
import { Customer } from "../entities/Customer.entity";
import AppError from "../errors/AppErrors.error";
import { ContactBodyUpdate, ContactCreate, ContactReturn, ContactsReturnList } from "../interfaces/contacts.interface";
import { contactReturnSchema, contactsReturnListSchema } from "../schemas/contacts.schema";

export class ContactService {
    async create(data: ContactCreate, customerId: number): Promise<ContactReturn> {
        const contactRepo = AppDataSource.getRepository(Contact)
        const customerRepo = AppDataSource.getRepository(Customer)
        const customer = await customerRepo.findOneBy({ id: customerId })

        if (!customer) throw new AppError("Customer not found", 404)

        const contact = contactRepo.create({
            ...data, customer
        })
        await contactRepo.save(contact)
        return contactReturnSchema.parse(contact)
    }


    async list(customerId: number): Promise<ContactsReturnList> {
        const customerRepo = AppDataSource.getRepository(Customer)
        const customer = await customerRepo.findOne({
            where: {
                id: customerId
            },
            relations: {
                contacts: true
            }
        })
        if (!customer) throw new AppError("Customer not found", 404)
        return contactsReturnListSchema.parse(customer.contacts)
    }

    async update(data: ContactBodyUpdate, contactId: number): Promise<ContactReturn> {
        const contactRepo = AppDataSource.getRepository(Contact)
        const foundContact = await contactRepo.findOneBy({ id: contactId })
        const contactUpdate = contactRepo.create({
            ...foundContact, ...data
        })
        await contactRepo.save(contactUpdate)
        return contactReturnSchema.parse(contactUpdate)
    }   

    async remove(contactId: number): Promise<void> {
        const contactRepo = AppDataSource.getRepository(Contact)
        const foundContact = await contactRepo.findOneBy({ id: contactId })

        if (!foundContact) throw new AppError("Contact not found", 404)

        await contactRepo.remove(foundContact)
    }
}