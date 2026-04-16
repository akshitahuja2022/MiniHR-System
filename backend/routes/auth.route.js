import express from "express";
import {
  authLogin,
  authLogout,
  authRegister,
  getUserProfile,
} from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", authRegister);
authRouter.post("/login", authLogin);
authRouter.post("/logout", authLogout);
authRouter.get("/profile", isAuthenticated, getUserProfile);

export default authRouter;
