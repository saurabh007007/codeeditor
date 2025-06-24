import express from "express";
import {
  register,
  login,
  logout,
  check,
} from "../controllers/auth.controller";
import { authMiddeware } from "../middleware/auth.middleware";

const authRouter = express.Router();

//register Routes

authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.post("/logout",authMiddeware, logout);

authRouter.get("/check",authMiddeware, check);

export default authRouter;
