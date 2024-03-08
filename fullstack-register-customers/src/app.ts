import "express-async-errors"
import "reflect-metadata"
import express from "express"
import { handleErrors } from "./middlewares/handleErrors.middleware"
import { routes } from "./routes"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173"
}))
app.use("/", routes)
app.use(handleErrors)

export default app