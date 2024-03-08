import { Router } from "express";
import { customerRouter } from "./customers.router";
import { contactRouter } from "./contacts.router";
import { loginRouter } from "./login.router";

export const routes: Router = Router()

routes.use("/customers", customerRouter)
routes.use("/contacts", contactRouter)
routes.use("/login", loginRouter)