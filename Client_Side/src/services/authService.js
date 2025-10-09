const API_BASE = import.meta.env.VITE_API_URL;
if (!API_BASE) console.warn("VITE_API_URL is not defined in .env file");

console.log("API_BASE:", API_BASE); // Should log "http://localhost:5000/api"

// ----------------- Register User -----------------
export const registerUser = async (formData) => {
  if (!API_BASE) throw new Error("API base URL is not defined.");

  try {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      body: formData, // for multipart/form-data
    });

    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return { success: false, message: "Invalid server response" };
    }

    if (!res.ok) return { success: false, message: data.message || "Registration failed" };

    // ✅ Store token in localStorage after successful registration
    if (data.token) localStorage.setItem("token", data.token);

    return {
      success: true,
      token: data.token || null,
      user: data.user || null,
      message: data.message || "Registration successful",
    };
  } catch (error) {
    console.error("registerUser error:", error.message);
    return { success: false, message: error.message };
  }
};

// ----------------- Login User -----------------
export const loginUser = async ({ email, password }) => {
  if (!API_BASE) throw new Error("API base URL is not defined.");

  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) return { success: false, message: data.message || "Login failed" };

    // ✅ Store token in localStorage after successful login
    if (data.token) localStorage.setItem("token", data.token);

    return { success: true, token: data.token, user: data.user };
  } catch (err) {
    console.error("loginUser error:", err.message);
    return { success: false, message: "Server error" };
  }
};

// ----------------- Logout User -----------------
export const logoutUser = async () => {
  const token = localStorage.getItem("token"); // ✅ read token from localStorage
  if (!token) return;

  try {
    await fetch(`${API_BASE}/auth/logout`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("logoutUser error:", error.message);
  } finally {
    localStorage.removeItem("token"); // always clear token
  }
};
