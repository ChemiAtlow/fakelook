import { Router } from "express";
import { googleController } from "../controllers";

export const googleRouter = Router();

googleRouter.post("/login", googleController.connectWithCode);