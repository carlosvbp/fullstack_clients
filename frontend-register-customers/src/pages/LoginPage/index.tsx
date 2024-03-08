import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { loginSchema, schema } from "./loginSchema"
import { AuthContext } from "../../providers/Context"
import { useContext } from "react"
import { Link } from "react-router-dom"

export const LoginPage = () => {
    const { logIn } = useContext(AuthContext)
    const { register, handleSubmit } = useForm<loginSchema>({
        resolver: zodResolver(schema)
    })

    const submit = (data: loginSchema) => {
        logIn(data)
    }

    return (
        <form onSubmit={handleSubmit(submit)}>
            <div>
                <h1>Login</h1>
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" {...register("email")} />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" {...register("password")} />
            </div>
            <div>
                <button type="submit">Acessar</button>
                <Link to={"/register"}>
                    <button>Cadastre-se</button>
                </Link>
            </div>
        </form>
    )
}