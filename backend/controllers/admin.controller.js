import AttendenceModel from "../models/attendece.model.js";
import LeaveModel from "../models/leave.model.js";
import UserModel from "../models/user.model.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password");
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const approveLeave = async (req, res) => {
  try {
    const { id } = req.params;

    const leave = await LeaveModel.findById(id).populate("user");

    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    if (leave.status !== "pending") {
      return res.status(400).json({ message: "Already processed" });
    }

    const user = leave.user;

    if (!leave.user) {
      return res.status(400).json({ message: "User not found in leave" });
    }

    if (user.leaveBalance < leave.totalDays) {
      return res.status(400).json({
        message: "Insufficient leave balance",
      });
    }

    user.leaveBalance -= leave.totalDays;
    await user.save();

    leave.status = "approved";
    await leave.save();

    res.status(200).json({
      message: "Leave approved",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const rejectLeave = async (req, res) => {
  try {
    const { id } = req.params;

    const leave = await LeaveModel.findById(id);

    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    if (leave.status !== "pending") {
      return res.status(400).json({ message: "Already processed" });
    }

    leave.status = "rejected";
    await leave.save();

    res.status(200).json({
      message: "Leave rejected",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllAttendence = async (req, res) => {
  try {
    const { date, userId } = req.query;

    const query = {};

    if (date) {
      const selectedDate = new Date(date);
      selectedDate.setHours(0, 0, 0, 0);

      query.date = selectedDate;
    }

    if (userId) {
      query.user = userId;
    }

    const records = await AttendenceModel.find(query)
      .populate("user", "fullName email")
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      records,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export { getAllUsers, rejectLeave, approveLeave, getAllAttendence };
