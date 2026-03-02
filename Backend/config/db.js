import mongoose from "mongoose";

// Use a global variable to preserve the connection across hot-reloads (dev)
// and function invocations (serverless/production)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  // 1. If a connection is already established, return it immediately.
  if (cached.conn) {
    return cached.conn;
  }

  // 2. If no connection promise exists, create one.
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable Mongoose buffering for faster errors
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    };

    console.log("Initializing new MongoDB connection...");

    cached.promise = mongoose
      .connect(process.env.MONGO_URI, opts)
      .then((mongoose) => {
        console.log("MongoDB Connected Successfully");
        return mongoose;
      });
  }

  // 3. Await the promise. If it fails, reset the promise so we can try again next time.
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error("MongoDB Connection Error:", e);
    throw e;
  }

  return cached.conn;
};

export default connectDB;
