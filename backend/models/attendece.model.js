import mongoose from "mongoose";

const attendenceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth-users",
      required: "true",
    },
    date: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["present", "absent"],
      required: true,
    },
  },
  { timestamps: true },
);

attendenceSchema.index({ user: 1, date: 1 }, { unique: true });

const AttendenceModel = new mongoose.model("attendence", attendenceSchema);
export default AttendenceModel;
