import { Router } from "express";
import { contactController } from "../controllers";
import { validateBody, verifyToken } from "../middlewares/globals.middleware";
import { createContactSchema, updateContactSchema } from "../schemas/contacts.schema";
import { verifyContactExistsAndIsOwned } from "../middlewares/contacts.middleware";

export const contactRouter: Router = Router()

contactRouter.post("/",
    verifyToken,
    validateBody(createContactSchema),
    (req, res) =>
        contactController.create(req, res))

contactRouter.get("/",
    verifyToken,
    (req, res) => contactController.list(req, res))

contactRouter.patch(
    "/:id",
    validateBody(updateContactSchema),
    verifyContactExistsAndIsOwned,
    (req, res) => contactController.update(req, res)
)

contactRouter.delete(
    "/:id",
    verifyContactExistsAndIsOwned,
    (req, res) => contactController.remove(req, res))
