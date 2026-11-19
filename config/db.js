import mongoose from "mongoose";

let isConnected = false;
const connectDB = async (mongoURI, dbName) => {
  if (isConnected || mongoose.connection.readyState >= 1) return;
  const uri =
    mongoURI ||
    process.env.MONGO_URI ||
    "mongodb+srv://admin:Cherry1234@cluster0.s735bf2.mongodb.net/?retryWrites=true&w=majority";
  const database = dbName || process.env.DB_NAME || "products_db";
  try {
    await mongoose.connect(uri, {
      dbName: database,
    });
    isConnected = true;
    console.log(`MongoDB connected to database: ${database}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
};

export default connectDB;
