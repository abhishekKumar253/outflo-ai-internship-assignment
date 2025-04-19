import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    const connecttionInstance = await mongoose.connect(
      process.env.MONGODB_URI!
    );
    console.log("MongoDB connected 🚀", connecttionInstance.connection.host);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
