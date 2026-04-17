import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import leaveRouter from "./routes/leave.route.js";
import attendanceRouter from "./routes/attendence.route.js";
import adminRouter from "./routes/admin.route.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use("/api/auth", authRouter);
app.use("/api/leave", leaveRouter);
app.use("/api/attendence", attendanceRouter);
app.use("/api/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("HR System Server is running successfully");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
