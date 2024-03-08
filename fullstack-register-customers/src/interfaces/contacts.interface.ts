import { z } from "zod"
import {
    createContactSchema,
    contactReturnSchema,
    contactSchema,
    contactsReturnListSchema
} from "../schemas/contacts.schema"
import { DeepPartial } from "typeorm"

export type Contact = z.infer<typeof contactSchema>
export type ContactCreate = z.infer<typeof createContactSchema>
export type ContactReturn = z.infer<typeof contactReturnSchema>
export type ContactsReturnList = z.infer<typeof contactsReturnListSchema>
export type ContactBodyUpdate = DeepPartial<ContactCreate>  