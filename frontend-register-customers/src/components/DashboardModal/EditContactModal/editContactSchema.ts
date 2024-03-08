import { z } from "zod"

export const editContactSchema = z.object({
    fullname: z.string().max(100),
    email: z.string().email("Coloque um email válido").max(50),
    phone: z.string(),
})

