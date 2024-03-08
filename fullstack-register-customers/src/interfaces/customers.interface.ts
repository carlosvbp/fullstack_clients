import { z } from "zod"
import {
    createCustomerSchema,
    customersReturnListSchema,
    customerReturnSchema,
    customerSchema,
    customerLoginSchema,
    updateCustomerSchema,
    customerWithTokenSchema,
} from "../schemas/customers.schema"
import { DeepPartial } from "typeorm"

export type Customer = z.infer<typeof customerSchema>
export type CustomerCreate = z.infer<typeof createCustomerSchema>
export type CustomerReturn = z.infer<typeof customerReturnSchema>
export type CustomersReturnList = z.infer<typeof customersReturnListSchema>
export type CustomerBodyUpdate = DeepPartial<CustomerCreate>
export type CustomerLogin = z.infer<typeof customerLoginSchema>
export type CustomerWithToken = z.infer<typeof customerWithTokenSchema>      