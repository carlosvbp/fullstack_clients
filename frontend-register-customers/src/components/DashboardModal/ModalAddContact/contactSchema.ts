import { z } from "zod"

export const schema = z.object({
    fullname: z.string().max(100),
    email: z.string().email("Coloque um email válido").max(50),
    phone: z.string(),
})

export type contactSchema = z.infer<typeof schema>