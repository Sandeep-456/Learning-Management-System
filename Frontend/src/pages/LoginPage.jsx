import { useState } from "react";
import { motion } from "framer-motion";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaSpinner } from "react-icons/fa";
import AspireLogo from "../assets/Aspire.jpg";
import loginImage from "../assets/Login/loginImage.png";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { fetchUserProfile, setAuth, setUserProfile } = useAuth();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      const { data } = await api.post("/auth/google", { idToken });

      setAuth({ isLoggedIn: true, loading: false });
      setUserProfile(data.profile);

      navigate("/");
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.msg || err.message || "Google Sign-In failed.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#1a1c4b] relative overflow-hidden font-sans text-white flex items-center justify-center">
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[700px] h-[700px] bg-blue-400/20 rounded-full blur-[140px]" />

      <main className="relative py-10 md:py-0 z-10 w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between px-8 gap-14">
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

            <img className="rounded-3xl" src={loginImage} alt="loginimage" />

            <p className="text-sm text-indigo-200/80 leading-relaxed max-w-md">
              Learn with purpose, grow with confidence, and build skills that
              move you forward every day.
            </p>
          </motion.div>
        </div>

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
          <div className="text-center mb-10">
            <img
              src={AspireLogo}
              className="h-20 mx-auto mb-5 rounded-3xl"
              alt="Logo"
            />
            <div className="w-14 h-1 bg-indigo-500 mx-auto rounded-full" />
          </div>

          <div className="space-y-6">
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-4 rounded-xl tracking-widest text-sm
                hover:shadow-[0_14px_30px_rgba(79,70,229,0.6)]
                active:translate-y-[5px]
                active:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.25)]
                duration-200 bg-white text-gray-700 font-bold
                flex items-center justify-center gap-3
                shadow-lg border-2 border-gray-200
                hover:scale-105 transition-transform"
            >
              {loading ?
                <FaSpinner className="animate-spin mr-2" />
              : <>
                  <FcGoogle className="text-2xl" />
                  Sign in with Google
                </>
              }
            </button>

            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}

            <p className="text-center text-[10px] uppercase font-bold text-gray-400 pt-4">
              Secure sign-in with your Google account
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
