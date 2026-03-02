import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    refreshToken: { type: String, required: true },
    expiresAt: { type: Date, required: true }, // 3 days idle expiry
    lastAccess: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Token", tokenSchema);
