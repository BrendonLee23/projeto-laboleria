import { Router } from "express";

const ordensRouter = Router();

ordensRouter.post("/customers", validateCustomers(customersSchema), postCustomers);

export default ordensRouter;