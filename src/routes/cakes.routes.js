import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { cakeSchema } from "../schemas/cake.schema.js";
import { postCakes } from "../controllers/cakes.controller.js";

const cakesRouter = Router();

cakesRouter.post("/cakes", validateSchema(cakeSchema), postCakes);

export default cakesRouter;
