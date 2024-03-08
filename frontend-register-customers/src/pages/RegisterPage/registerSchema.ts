import { z } from "zod"

export const schema = z.object({
    fullname: z.string(),
    email: z.string().min(1, "O e-mail é obrigatório"),
    password: z.string().min(1, "A senha é obrigatória"),
    phone: z.string()
})

export type registerSchema = z.infer<typeof schema>