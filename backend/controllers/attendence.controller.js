import AttendenceModel from "../models/attendece.model.js";

const markAttendence = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
        success: false,
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existing = await AttendenceModel.findOne({
      user: req.user._id,
      date: today,
    });

    if (existing) {
      return res.status(400).json({
        message: "Attendance already marked for today",
        success: false,
      });
    }

    const attendance = await AttendenceModel.create({
      user: req.user._id,
      date: today,
      status,
    });

    res.status(201).json({
      message: "Attendance marked",
      success: true,
      attendance,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const getMyAttendence = async (req, res) => {
  try {
    const attendence = await AttendenceModel.find({
      user: req.user._id,
    }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      attendence,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

// For Admin
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
export { markAttendence, getMyAttendence, getAllAttendence };
