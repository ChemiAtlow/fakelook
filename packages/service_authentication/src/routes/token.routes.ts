import { Router } from "express";
import { tokenController } from "../controllers";

export const tokenRouter = Router();

tokenRouter.post("/verify", tokenController.verifyAndReturnNew);
tokenRouter.post("/refresh", tokenController.exchangeTokens);