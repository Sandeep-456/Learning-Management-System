import Token from "../models/Token.js";

import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  try {
    // 1. Read the token from the cookie
    const token = req.cookies.auth_token;
    if (!token) {
      return res.status(401).json({ msg: "Not authorized, no token" });
    }

    // 2. Verify the token signature
    // This will throw an error if the token is expired or invalid
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Attach the user ID to the request object
    // In loginMobileUser, we signed it as: { id: user._id }
    req.userId = decoded.id;

    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err.message);

    // Clear the invalid cookie so the frontend knows to show login state
    res.cookie("auth_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      expires: new Date(0),
    });

    return res.status(401).json({ msg: "Not authorized, token failed" });
  }
};

// // test user
// const testUser = {
//   mobile: "9898989898",
//   username: "Sairam",
//   _id: "6971fc66860ef63913d383aa",
// };

export const admin = async (req, res, next) => {
  try {
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Admin error" });
  }
};
