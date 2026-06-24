import express from "express";
import {
  sendOtp,
  verifyOtp,
  refreshToken,
  logout,
  getProfile,
  updateProfile,
  registerUser,
  checkUserMobile,
  loginMobileUser,
  googleLogin,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.get("/refresh", protect, refreshToken);
router.post("/logout", logout);

router.post("/google", googleLogin);

router.post("/check-user", checkUserMobile);
router.post("/login-mobile", loginMobileUser);

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

export default router;
