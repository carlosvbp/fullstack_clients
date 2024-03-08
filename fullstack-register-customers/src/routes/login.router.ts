import { loginController } from "../controllers";
import { validateBody } from "../middlewares/globals.middleware";
import { customerLoginSchema } from "../schemas/customers.schema";
import { Request, Response, Router } from "express";

export const loginRouter: Router = Router()

loginRouter.post("/", validateBody(customerLoginSchema),
    (req: Request, res: Response) =>
        loginController.login(req, res))