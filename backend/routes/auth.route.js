import express from "express";
import {
  authLogin,
  authLogout,
  authRegister,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", authRegister);
authRouter.post("/login", authLogin);
authRouter.post("/logout", authLogout);

export default authRouter;
