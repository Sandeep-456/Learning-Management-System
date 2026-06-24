import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    mobile: {
      type: String,
      sparse: true,
    },
    email: {
      type: String,
      sparse: true,
    },
    name: {
      type: String,
    },
    username: {
      type: String,
    },
    provider: {
      type: String,
      enum: ["google", "phone"],
      default: "phone",
    },
    firebaseUid: {
      type: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
