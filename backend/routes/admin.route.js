import express from "express";
import { isAdmin, isAuthenticated } from "../middleware/auth.middleware.js";
import {
  approveLeave,
  getAllAttendence,
  getAllLeaves,
  getAllUsers,
  rejectLeave,
} from "../controllers/admin.controller.js";

const adminRouter = express.Router();

adminRouter.get("/users", isAuthenticated, isAdmin, getAllUsers);
adminRouter.put("/leave/approve/:id", isAuthenticated, isAdmin, approveLeave);
adminRouter.put("/leave/reject/:id", isAuthenticated, isAdmin, rejectLeave);
adminRouter.get("/all", isAuthenticated, isAdmin, getAllAttendence);
adminRouter.get("/leaves", isAuthenticated, isAdmin, getAllLeaves);
export default adminRouter;
