import { z } from "zod"
import { contactSchema } from "./contacts.schema"

export const customerSchema = z.object({
    id: z.number().positive(),
    fullname: z.string().max(100),
    email: z.string().email().max(50),
    password: z.string().max(140),
    phone: z.string(),
    createdAt: z.string().or(z.date()),
})

export const createCustomerSchema = customerSchema.pick({
    fullname: true,
    email: true,
    password: true,
    phone: true
})

export const customerReturnSchema = customerSchema.omit({
    password: true
})

export const customerReturnContactSchema = customerSchema.omit({
    password: true
}).extend({
    contacts: contactSchema.array()
})

export const customersReturnListSchema = customerReturnSchema.array()

export const updateCustomerSchema = createCustomerSchema.partial()

export const customerLoginSchema = customerSchema.pick({
    email: true,
    password: true
})

export const customerWithTokenSchema = customerSchema.extend({
    token: z.string(),
});
