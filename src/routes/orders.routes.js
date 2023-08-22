import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import orderSchema from "../schemas/order.schema.js";
import { createOrder } from "../controllers/orders.controller.js";

const ordersRouter = Router();

ordersRouter.post("/orders",validateSchema(orderSchema), createOrder);

export default ordersRouter;