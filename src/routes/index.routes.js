import { Router } from "express";
import clientsRouter from "./clients.routes";
import cakesRouter from "./cakes.routes";
import ordensRouter from "./orders.routes";


const router = Router()
/* router.use(receitasRouter) */
router.use(cakesRouter)
router.use(clientsRouter)
router.use(ordensRouter)

export default router;
