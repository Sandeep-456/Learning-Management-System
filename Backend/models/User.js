import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    mobile: {
      type: String,
      unique: true,
    },
    username: {
      type: String,
    },
    // future fields (name, email, role, batches etc.)
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
