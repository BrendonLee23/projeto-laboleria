import { Router } from "express";

const cakesRouter = Router();

cakesRouter.post("/customers", validateCustomers(customersSchema), postCustomers);

export default cakesRouter;
