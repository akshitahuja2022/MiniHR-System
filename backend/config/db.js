import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connect to DB Successfully");
  } catch (error) {
    console.log("MongoDB Connection error", error);
  }
};

export default connectDB;
