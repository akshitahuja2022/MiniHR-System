import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["Employee", "Admin"], default: "Employee" },
    dateOfJoining: { type: Date, default: Date.now },
    leaveBalance: { type: Number, default: 20 },
  },
  { timestamps: true },
);

const UserModel = new mongoose.model("auth-users", userSchema);
export default UserModel;
