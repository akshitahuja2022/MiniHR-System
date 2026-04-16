import express from "express";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import {
  getMyAttendence,
  markAttendence,
} from "../controllers/attendence.controller.js";

const attendanceRouter = express.Router();

attendanceRouter.post("/marked", isAuthenticated, markAttendence);
attendanceRouter.get("/my-attendence", isAuthenticated, getMyAttendence);

export default attendanceRouter;
