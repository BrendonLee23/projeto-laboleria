import { Router } from "express";
import flavourSchema from "../schemas/flavour.schema.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { createFlavour } from "../controllers/flavours.controller.js";

// BÔNUS ************************************************

const flavoursRouter = Router();

flavoursRouter.post("/flavours", validateSchema(flavourSchema), createFlavour);

export default flavoursRouter;
