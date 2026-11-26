import mongoose from "mongoose";
import dns from "node:dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

async function connectDB() {
  try {
    const connection = await mongoose.connect(
      process.env.MONGODB_URI
    );

    console.log("MongoDB connected successfully");

    console.log(
      `Host: ${connection.connection.host}`
    );

    console.log(
      `Database: ${connection.connection.name}`
    );

  } catch (error) {
    console.error(
      "MongoDB connection failed:",
      error.message
    );

    process.exit(1);
  }
}

export default connectDB;