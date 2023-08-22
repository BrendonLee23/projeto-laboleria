import { Router } from "express";

const clientsRouter = Router();

customersRouter.post("/customers", validateCustomers(customersSchema), postCustomers);

export default clientsRouter;
