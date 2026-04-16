import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth-users",
      requird: true,
    },
    leaveType: {
      type: String,
      enum: ["casual", "sick", "paid"],
      requird: "true",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    totalDays: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    reason: {
      type: String,
    },
  },
  { timestamps: true },
);

const LeaveModel = new mongoose.model("leave", leaveSchema);
export default LeaveModel;
