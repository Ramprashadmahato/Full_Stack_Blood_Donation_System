import { createContext, useState, useEffect } from "react";
import { registerUser, loginUser, logoutUser } from "../services/authService";
import { getProfile } from "../services/userService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await getProfile(token);
        if (res.success) {
          setUser(res.user);
          localStorage.setItem("user", JSON.stringify(res.user));
        } else {
          handleLogout();
        }
      } catch (err) {
        console.error(err);
        handleLogout();
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [token]);

  const handleRegister = async (formData) => {
    try {
      const res = await registerUser(formData);
      if (res.success && res.token) {
        setToken(res.token);
        setUser(res.user);
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
      }
      return res;
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const handleLogin = async (formData) => {
    try {
      const res = await loginUser(formData);
      if (res.success && res.token) {
        setToken(res.token);
        setUser(res.user);
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
      }
      return res;
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser(token);
    } catch (err) {
      console.error(err);
    }
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        register: handleRegister,
        login: handleLogin,
        logout: handleLogout,
        updateUser, // ✅ exposed to update profile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
