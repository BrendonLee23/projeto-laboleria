import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import clientSchema from "../schemas/client.schema.js";
import { createClient } from "../controllers/clients.controller.js";
import { ordersByClient } from "../controllers/orders.controller.js";

const clientsRouter = Router();

clientsRouter.post("/clients",validateSchema(clientSchema), createClient);
clientsRouter.get("/clients/:id/orders", ordersByClient);

export default clientsRouter;
