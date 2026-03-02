import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import apiRoutes from "./routes/courseRoutes.js";
import batchRoutes from "./routes/batchRoutes.js"; // Import batch routes
import studentRoutes from "./routes/studentRoutes.js";
import mcqRoutes from "./routes/mcqRoutes.js";
import codingRoutes from "./routes/codingRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

// Vite frontend URL — replace during deploy
app.use(
  cors({
    origin: (origin, callback) => {
      // Hardcode localhost and get remaining allowed origins from the environment
      const allowedOrigins = [
        "http://localhost:5173",
        ...process.env.CORS_ALLOWED_ORIGINS?.split(","),
      ];

      // Check if the origin is in the allowed list, or if it's a non-browser request (origin can be null)
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true); // If allowed, grant access
      } else {
        callback(new Error("Not allowed by CORS")); // Deny if not in the list
      }
    },
    credentials: true, // If you need credentials (cookies) with requests
  }),
);

// This ensures DB is connected before ANY route handler runs
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection failed in middleware:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Example route for root path to show that API is running
app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api", apiRoutes);
app.use("/api/batches", batchRoutes); // Use batch routes
app.use("/api/student", studentRoutes);

app.use("/api/mcq", mcqRoutes);

app.use("/api/coding", codingRoutes);

app.use("/api/projects", projectRoutes);

// Keep this for local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`API is running locally on port ${PORT}...`);
  });
}

export default app;
