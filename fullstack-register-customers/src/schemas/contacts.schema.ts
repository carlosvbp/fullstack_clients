import { z } from "zod"

export const contactSchema = z.object({
    id: z.number().positive(),
    fullname: z.string().max(100),
    email: z.string().email().max(50),
    phone: z.string(),
    createdAt: z.string().or(z.date()),
})

export const createContactSchema = contactSchema.pick({
    fullname: true,
    email: true,
    phone: true
})

export const contactReturnSchema = contactSchema

export const contactsReturnListSchema = contactReturnSchema.array()
    
export const updateContactSchema = createContactSchema.partial()