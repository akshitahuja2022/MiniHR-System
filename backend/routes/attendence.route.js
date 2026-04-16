import express from "express";
import { isAdmin, isAuthenticated } from "../middleware/auth.middleware.js";
import {
  getAllAttendence,
  getMyAttendence,
  markAttendence,
} from "../controllers/attendence.controller.js";

const attendanceRouter = express.Router();

attendanceRouter.post("/marked", isAuthenticated, markAttendence);
attendanceRouter.get("/my-attendence", isAuthenticated, getMyAttendence);

// For Admin
attendanceRouter.get("/all", isAuthenticated, isAdmin, getAllAttendence);

export default attendanceRouter;
