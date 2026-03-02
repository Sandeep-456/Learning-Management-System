import { createContext, useContext, useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth as firebaseAuth } from "../firebase";
import api from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isLoggedIn: false, loading: true });
  const [userProfile, setUserProfile] = useState(null);

  const fetchUserProfile = async () => {
    // No change here, but for context: this function now implicitly handles auth verification
    try {
      const { data } = await api.get("/auth/profile");
      setUserProfile(data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setUserProfile(null); // Clear profile on error
      // We need to re-throw the error so the caller knows it failed
      throw error;
    }
  };

  useEffect(() => {
    const verifyAuth = async () => {
      // Only perform verification if we are not already marked as logged in
      // This prevents the useEffect from re-triggering fetchUserProfile
      // if LoginPage has already successfully authenticated and set isLoggedIn to true.
      if (!auth.isLoggedIn) {
        try {
          await fetchUserProfile();
          setAuth({ isLoggedIn: true, loading: false });
        } catch (error) {
          // If fetchUserProfile fails, ensure isLoggedIn is false and loading is complete
          setAuth({ isLoggedIn: false, loading: false });
        }
      } else {
        // If we are already logged in (e.g., from LoginPage) and this useEffect runs,
        // ensure loading is false to prevent ProtectedRoute from rendering null.
        // This handles cases where useEffect might re-run due to other dependencies,
        // but we don't need to refetch if already authenticated.
        setAuth((prev) => ({ ...prev, loading: false }));
      }
    };

    verifyAuth();
  }, [auth.isLoggedIn]); // Re-run if isLoggedIn changes, reacting to LoginPage's update.

  const logout = async () => {
    try {
      // Sign out from Firebase
      await signOut(firebaseAuth);
      // Then, sign out from the backend session
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setAuth({ isLoggedIn: false, loading: false });
      setUserProfile(null); // Clear profile on logout
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        userProfile,
        fetchUserProfile,
        logout,
        setAuth,
        setUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
