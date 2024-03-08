import { useContext } from "react"
import { AuthContext } from "../providers/Context"

export const userAuth = () => {
    const authContext = useContext(AuthContext)
    return authContext
}