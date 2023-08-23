import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import orderSchema from "../schemas/order.schema.js";
import { createOrder, getOrderById, getOrders } from "../controllers/orders.controller.js";
import { updateOrderDeliveryStatus } from "../controllers/delivery.controller.js";

const ordersRouter = Router();

ordersRouter.post("/orders", validateSchema(orderSchema), createOrder);
ordersRouter.get("/orders", getOrders);
ordersRouter.get("/orders/:id", getOrderById);

// BÔNUS ************************************************

ordersRouter.patch("/order/:id",updateOrderDeliveryStatus );

export default ordersRouter;

