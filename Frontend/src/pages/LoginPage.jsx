import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { MdLocalPhone } from "react-icons/md";
import { FaLock, FaSpinner } from "react-icons/fa";
import AspireLogo from "../assets/Aspire.jpg";
import loginImage from "../assets/Login/loginImage.png";
import { useAuth } from "../context/AuthContext";

import api from "../utils/api";

// Helper for backend URL - CHANGE THIS IF NEEDED
// const API_URL = "http://localhost:5000/api/auth/check-user";

export default function LoginPage() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");

  // 1. State to track which dot is active based on scroll
  const [activeIndex, setActiveIndex] = useState(0);
  const [step, setStep] = useState("mobile");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mascotIndex, setMascotIndex] = useState(0);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  // Doubling for infinite loop effect
  const CARD_WIDTH = 340; // Card width + gap

  const { fetchUserProfile, setAuth, setUserProfile } = useAuth();

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
        },
      );
    }
  }, []);

  // Validation Logic
  const validateMobile = (num) => {
    const regex = /^[6-9]\d{9}$/;
    if (!num) return "Mobile number is required";
    if (!regex.test(num)) return "Enter a valid 10-digit mobile number";
    return "";
  };

  const validateOtp = (code) => {
    if (code.length !== 6) return "Enter a 6-digit OTP";
    if (isNaN(code)) return "OTP must be numeric";
    return "";
  };

  // --- UPDATED SEND OTP LOGIC ---
  const sendOtp = async () => {
    // 1. Validate Input Format
    const validationError = validateMobile(mobile);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setLoading(true);

    try {
      // 2. CHECK USER EXISTENCE IN BACKEND
      // Change .get to .post
      // Pass { mobile } as the second argument (the body)
      const { data } = await api.post("/auth/check-user", { mobile });
      // console.log(data);

      // Note: If you are using Axios (implied by `api` utils), you don't need
      // "if (!response.ok)" because Axios throws an error automatically for bad status codes.

      // If user does NOT exist in DB, stop here
      if (!data.exists) {
        setError("User not found.");
        setLoading(false);
        return;
      }

      // 3. USER EXISTS -> PROCEED TO FIREBASE OTP
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          { size: "invisible" },
        );
      }

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        `+91${mobile}`,
        window.recaptchaVerifier,
      );

      window.confirmationResult = confirmationResult;
      setStep("otp");
    } catch (err) {
      console.error(err);
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
      // Handle Axios error response safely
      const msg =
        err.response?.data?.msg || err.message || "Failed to send OTP.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    // ... validation ...
    setLoading(true);

    try {
      // 1. Firebase Verify
      const result = await window.confirmationResult.confirm(otp);

      // 2. GET THE TOKEN (This is the proof of identity)
      const idToken = await result.user.getIdToken();

      // 3. Send Token to Backend and get user data
      const { data } = await api.post("/auth/login-mobile", {
        idToken,
        rememberMe,
      });

      // 4. Update AuthContext directly with user data
      setAuth({ isLoggedIn: true, loading: false });
      setUserProfile(data.profile); // Backend now returns { success: true, profile: profileData }

      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#1a1c4b] relative overflow-hidden font-sans text-white flex items-center justify-center">
      {/* Soft Clay Background Orbs */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[700px] h-[700px] bg-blue-400/20 rounded-full blur-[140px]" />

      <main className="relative py-10 md:py-0 z-10 w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between px-8 gap-14">
        {/* LEFT SECTION */}
        <div className="flex-1 max-w-[100%]">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
              Welcome Back
            </h1>

            <h2 className="text-md md:text-xl text-indigo-200 mb-8">
              Build skills. Track growth. Succeed smarter.
            </h2>

            <img className=" rounded-3xl" src={loginImage} alt="loginimage" />

            <p className="text-sm text-indigo-200/80 leading-relaxed max-w-md">
              Learn with purpose, grow with confidence, and build skills that
              move you forward every day.
            </p>
          </motion.div>
        </div>

        {/* RIGHT LOGIN CARD */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="
          relative order-0 w-[90%] md:w-full md:max-w-[440px]
          rounded-[36px] p-6 md:p-12
          bg-white/85 backdrop-blur-2xl
          shadow-[0_40px_80px_rgba(0,0,0,0.35)]
          border border-white/60
          text-gray-800 dark:text-gray-900
        "
        >
          <div id="recaptcha-container"></div>

          <div className="text-center mb-10">
            <img
              src={AspireLogo}
              className="h-20 mx-auto mb-5 rounded-3xl"
              alt="Logo"
            />
            <div className="w-14 h-1 bg-indigo-500 mx-auto rounded-full" />
          </div>

          <AnimatePresence mode="wait">
            {step === "mobile" ?
              <motion.div
                key="mobile"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/70 shadow-[inset_4px_4px_8px_rgba(0,0,0,0.08), inset_-4px_-4px_8px_rgba(255,255,255,0.7)] transition-all">
                  <span className="opacity-40 text-lg">
                    <MdLocalPhone />
                  </span>
                  <input
                    type="tel"
                    placeholder="ENTER MOBILE NUMBER"
                    value={mobile}
                    onChange={(e) => {
                      setMobile(e.target.value.replace(/\D/g, ""));
                      setError(""); // Clear error when mobile input changes
                    }}
                    maxLength={10}
                    className="w-full text-[14px] md:text-[15px] bg-transparent outline-none text-sm font-bold tracking-widest placeholder-gray-400"
                  />
                </div>

                <button
                  onClick={sendOtp}
                  disabled={mobile.length !== 10 || loading} // Disable button when loading
                  className="w-full py-4 rounded-xl tracking-widest text-sm hover:shadow-[0_14px_30px_rgba(79,70,229,0.6)] active:translate-y-[5px] active:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.25)]  duration-200 bg-[#4F46E5] text-white font-black flex items-center justify-center shadow-lg border-2 border-white/10 hover:scale-105 transition-transform clay-profile"
                >
                  {(
                    loading // Show loader if loading
                  ) ?
                    <FaSpinner className="animate-spin mr-2" />
                  : "SEND OTP"}
                </button>
                {error && (
                  <p className="text-red-600 text-sm text-center">{error}</p>
                )}
              </motion.div>
            : <motion.div
                key="otp"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/70 shadow-[inset_4px_4px_8px_rgba(0,0,0,0.08), inset_-4px_-4px_8px_rgba(255,255,255,0.7)] transition-all">
                  <span className="mr-3 opacity-40">
                    <FaLock />
                  </span>
                  <input
                    type="text"
                    placeholder="ENTER 6-DIGIT OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    className="w-full text-sm font-bold tracking-widest outline-none placeholder-gray-400 bg-transparent"
                  />
                </div>

                <button
                  onClick={verifyOtp}
                  disabled={loading} // Disable button when loading
                  className="w-full py-4 rounded-xl tracking-widest text-sm hover:shadow-[0_14px_30px_rgba(79,70,229,0.6)] active:translate-y-[5px] active:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.25)]  duration-200 bg-[#4F46E5] text-white font-black flex items-center justify-center shadow-lg border-2 border-white/10 hover:scale-105 transition-transform clay-profile"
                >
                  {(
                    loading // Show loader if loading
                  ) ?
                    <FaSpinner className="animate-spin mr-2" />
                  : "VERIFY & LOGIN"}
                </button>

                <p
                  onClick={() => setStep("mobile")}
                  className="text-center text-[10px] uppercase font-bold text-gray-400 cursor-pointer hover:text-indigo-600"
                >
                  ← Edit Mobile Number
                </p>
              </motion.div>
            }
          </AnimatePresence>

          {/* <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-gray-300"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember Me
            </label>
          </div> */}
        </motion.div>
      </main>
    </div>
  );
}
