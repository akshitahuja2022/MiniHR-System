import LeaveModel from "../models/leave.model.js";
import { calculateDays } from "../utils/calculateDays.js";

const applyLeave = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;

    if (!leaveType || !startDate || !endDate) {
      return res.status(400).json({
        message: "Required fields missing",
        success: false,
      });
    }

    const totalDays = calculateDays(startDate, endDate);

    const leave = await LeaveModel.create({
      user: req.user._id,
      leaveType,
      startDate,
      endDate,
      totalDays,
      reason,
    });

    res.status(201).json({
      message: "Leave applied successfully",
      success: true,
      leave,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const getMyLeaves = async (req, res) => {
  try {
    const leaves = await LeaveModel.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      success: true,
      leaves,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const updateLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const { startDate, endDate, reason } = req.body;

    const leave = await LeaveModel.findById(id);
    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    if (leave.status !== "pending") {
      return res.status(400).json({
        message: "Only pending leave can be edited",
      });
    }

    leave.startDate = startDate;
    leave.endDate = endDate;
    leave.reason = reason;

    leave.totalDays = calculateDays(leave.startDate, leave.endDate);

    await leave.save();

    res.status(200).json({
      message: "Leave updated",
      success: true,
      leave,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const cancelLeave = async (req, res) => {
  try {
    const { id } = req.params;

    const leave = await LeaveModel.findById(id);

    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    if (leave.status !== "pending") {
      return res.status(400).json({
        message: "Only pending leave can be cancelled",
      });
    }

    leave.status = "cancelled";
    await leave.save();

    res.status(200).json({
      message: "Leave cancelled",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const viewLeaveHistory = async (req, res) => {
  try {
    const { status } = req.query;

    console.log(req.user._id);
    const leaves = await LeaveModel.find({
      user: req.user._id,
      ...(status && { status }),
    }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, leaves });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const getLeaveBalance = async (req, res) => {
  try {
    const TOTAL_LEAVE = 20;

    const approvedLeaves = await LeaveModel.find({
      user: req.user._id,
      status: "approved",
    });

    const usedDays = approvedLeaves.reduce(
      (sum, leave) => sum + leave.totalDays,
      0,
    );

    const remaining = TOTAL_LEAVE - usedDays;

    res.status(200).json({
      success: true,
      balance: {
        total: TOTAL_LEAVE,
        used: usedDays,
        remaining: remaining < 0 ? 0 : remaining,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  applyLeave,
  getMyLeaves,
  updateLeave,
  cancelLeave,
  viewLeaveHistory,
  getLeaveBalance,
};
