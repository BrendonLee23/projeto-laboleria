import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import clientSchema from "../schemas/client.schema.js";
import { createClient } from "../controllers/clients.controller.js";

const clientsRouter = Router();

clientsRouter.post("/clients",validateSchema(clientSchema), createClient);

export default clientsRouter;
