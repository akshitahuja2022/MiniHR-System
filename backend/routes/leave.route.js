import express from "express";
import {
  applyLeave,
  cancelLeave,
  getLeaveBalance,
  getMyLeaves,
  updateLeave,
  viewLeaveHistory,
} from "../controllers/leave.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const leaveRouter = express.Router();

leaveRouter.post("/apply", isAuthenticated, applyLeave);
leaveRouter.get("/allLeaves", isAuthenticated, getMyLeaves);
leaveRouter.put("/edit/:id", isAuthenticated, updateLeave);
leaveRouter.delete("/cancel/:id", isAuthenticated, cancelLeave);
leaveRouter.get("/leaveHistory", isAuthenticated, viewLeaveHistory);
leaveRouter.get("/balance", isAuthenticated, getLeaveBalance);

export default leaveRouter;
