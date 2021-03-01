import { Router } from "express";
import { facebookController } from "../controllers";

export const facebookRouter = Router();

facebookRouter.post("/login", facebookController.connectWithCode);
