import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import leaveRouter from "./routes/leave.route.js";
import attendanceRouter from "./routes/attendence.route.js";
import adminRouter from "./routes/admin.route.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRouter);
app.use("/api/leave", leaveRouter);
app.use("/api/attendence", attendanceRouter);
app.use("/api/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
