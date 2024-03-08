import { Request, Response, Router } from "express";
import { customerController } from "../controllers";
import { validateBody, verifyToken } from "../middlewares/globals.middleware";
import { createCustomerSchema, updateCustomerSchema } from "../schemas/customers.schema";
import { verifyCustomerExistsAndIsOwned } from "../middlewares/customers.middleware";

export const customerRouter: Router = Router()

customerRouter.post("/", validateBody(createCustomerSchema),
    (req: Request, res: Response) =>
        customerController.create(req, res))

customerRouter.get("/", verifyToken,
    (req, res) =>
        customerController.list(req, res))

customerRouter.patch(
    "/:id",
    validateBody(updateCustomerSchema),
    verifyCustomerExistsAndIsOwned,
    (req, res) => customerController.update(req, res)
)

customerRouter.delete(
    "/:id",
    verifyCustomerExistsAndIsOwned,
    (req, res) => customerController.remove(req, res))