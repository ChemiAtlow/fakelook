import { Router } from "express";
import { googleController } from "../controllers";

export const googleRouter = Router();

googleRouter.get("/login", googleController.connectWithCode);