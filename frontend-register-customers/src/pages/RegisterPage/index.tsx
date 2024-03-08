import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { registerSchema, schema } from "./registerSchema"
import { AuthContext } from "../../providers/Context"
import { useContext } from "react"

export const RegisterPage = () => {
    const { customerRegister } = useContext(AuthContext)
    const { register, handleSubmit } = useForm<registerSchema>({
        resolver: zodResolver(schema)
    })

    const submit = (formData: registerSchema) => {
        customerRegister(formData)
    }

    return (
        <form onSubmit={handleSubmit(submit)}>
            <div>
                <h1>Cadastro</h1>
            </div>
            <div>
                <label htmlFor="fullname">Nome completo</label>
                <input type="fullname" id="fullname" {...register("fullname")} />
                <label htmlFor="email">Email</label>
                <input type="email" id="email" {...register("email")} />
                <label htmlFor="password">Senha</label>
                <input type="password" id="password" {...register("password")} />
                <label htmlFor="phone">Telefone</label>
                <input type="phone" id="phone" {...register("phone")} />
            </div>
            <div>
                <button>Cadastrar</button>
            </div>
        </form>
    )
}