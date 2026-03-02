import User from "../models/User.js";
import Token from "../models/Token.js";
import Profile from "../models/Profile.js";
import crypto from "crypto";
import admin from "../config/firebaseAdmin.js";
import jwt from "jsonwebtoken";

const OTP_STORE = new Map(); // temporary OTP store (replace later with Firebase)

// REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const { mobile, username } = req.body;

    if (!mobile || !username) {
      return res.status(400).json({ msg: "Mobile and username are required" });
    }

    let userExists = await User.findOne({ $or: [{ mobile }, { username }] });
    if (userExists) {
      return res
        .status(400)
        .json({ msg: "User with this mobile or username already exists" });
    }

    const user = await User.create({ mobile, username });

    res.status(201).json({
      msg: "User registered successfully",
      user: { id: user._id, mobile: user.mobile, username: user.username },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// SEND OTP
export const sendOtp = async (req, res) => {
  try {
    const { mobile } = req.body;
    if (!mobile) return res.status(400).json({ msg: "Mobile required" });

    // create user if not exists
    let user = await User.findOne({ mobile });
    if (!user) {
      const username = `user_${crypto.randomBytes(4).toString("hex")}`;
      user = await User.create({ mobile, username });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    OTP_STORE.set(mobile, otp);

    console.log("OTP:", mobile, otp); // mock output, future → Firebase

    return res.json({ msg: "OTP sent" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// check user
export const checkUserMobile = async (req, res) => {
  try {
    const { mobile } = req.body;
    if (!mobile) return res.status(400).json({ msg: "Mobile required" });

    // Check if the user with the provided mobile number exists
    const user = await User.findOne({ mobile });

    if (user) {
      return res.json({ msg: "User exists", exists: true });
    } else {
      return res.json({ msg: "User does not exist", exists: false });
    }
  } catch (err) {
    console.error("Error in checkUserMobile:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// @desc    Login via Mobile (After Firebase Verify)
// @route   POST /api/auth/login-mobile
export const loginMobileUser = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ msg: "No token provided" });
    }

    // 1. VERIFY TOKEN WITH FIREBASE
    // This throws an error if the token is fake or expired
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    // 2. Extract Phone Number from the secure token
    // Firebase returns numbers like "+919876543210"
    const firebasePhone = decodedToken.phone_number;

    // Remove "+91" to match your DB format (if you store 10 digits)
    // Or adjust logic to match how you store numbers
    const mobileToCheck = firebasePhone.replace("+91", "");

    // 3. Find User in YOUR Database
    const user = await User.findOne({ mobile: mobileToCheck });

    if (!user) {
      return res.status(404).json({ msg: "User not found in database" });
    }

    // Ensure a profile exists for the user and populate it
    let profile = await Profile.findOne({ user: user._id }).populate(
      "user",
      "mobile username",
    );

    if (!profile) {
      profile = await Profile.create({ user: user._id });
      profile = await Profile.findOne({ user: user._id }).populate(
        "user",
        "mobile username",
      );
    }

    // 4. Generate YOUR Session Cookie (Same as before)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 3 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    res.status(200).json({ success: true, profile }); // Return the profile object
  } catch (error) {
    console.error("Firebase Token Verification Failed:", error);
    res.status(401).json({ msg: "Invalid or expired token" });
  }
};

// VERIFY OTP
export const verifyOtp = async (req, res) => {
  try {
    const { mobile, otp } = req.body;
    const foundOtp = OTP_STORE.get(mobile);

    if (!foundOtp || otp !== foundOtp) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }

    OTP_STORE.delete(mobile);

    const user = await User.findOne({ mobile });

    const refreshToken = crypto.randomBytes(32).toString("hex");

    const expiresAt = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

    await Token.create({
      userId: user._id,
      refreshToken,
      expiresAt,
      lastAccess: new Date(),
    });

    res.cookie("auth_token", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: false, // set true for production
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    return res.json({ msg: "Login success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// REFRESH TOKEN (extend 3 days on visit)
export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies?.auth_token;
    if (!refreshToken) return res.status(401).json({ msg: "No token" });

    const token = await Token.findOne({ refreshToken });

    if (!token) return res.status(401).json({ msg: "Invalid token" });

    if (token.expiresAt < new Date()) {
      await Token.deleteOne({ _id: token._id });
      res.clearCookie("auth_token");
      return res.status(401).json({ msg: "Session expired" });
    }

    token.expiresAt = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
    token.lastAccess = new Date();
    await token.save();

    return res.json({ msg: "Valid", userId: token.userId });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// LOGOUT
export const logout = async (req, res) => {
  try {
    // console.log(
    //   "Logout request received. Cookie to clear:",
    //   req.cookies.auth_token,
    // );
    res.cookie("auth_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      expires: new Date(0),
    });
    console.log("Cookie clear instruction sent by expiring it.");
    res.json({ msg: "Logged out" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error during logout" });
  }
};

// GET USER PROFILE
export const getProfile = async (req, res) => {
  try {
    const userId = req.userId; // Assuming userId is available from an auth middleware
    // console.log(userId);
    let profile = await Profile.findOne({ user: userId }).populate(
      "user",
      "mobile username",
    );

    if (!profile) {
      profile = await Profile.create({ user: userId });
      profile = await Profile.findOne({ user: userId }).populate(
        "user",
        "mobile username",
      );
    }

    res.json(profile);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// UPDATE USER PROFILE
export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    let profileData = req.body;

    // Remove the `_id` field from profileData to prevent duplicate key errors
    delete profileData._id;

    // console.log("Profile data being updated:", profileData);

    // Find the profile by userId and update it
    const profile = await Profile.findOneAndUpdate(
      { user: userId },
      profileData,
      { new: true, upsert: true }, // Ensure upsert is only creating a new document if not found
    ).populate("user", "mobile username");

    res.json(profile);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};
