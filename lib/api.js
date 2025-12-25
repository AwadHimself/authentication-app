const BASE_URL = "https://tinytales.trendline.marketing/api";

// Helpers
export const getToken = () => {
  if (typeof window !== "undefined") return localStorage.getItem("token");
  return null;
};

export const setToken = (token) => {
  if (typeof window !== "undefined") localStorage.setItem("token", token);
};

export const removeToken = () => {
  if (typeof window !== "undefined") localStorage.removeItem("token");
};

// Register
export const register = async (data) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("mobile", data.mobile);
  formData.append("password", data.password);
  formData.append("password_confirmation", data.password_confirmation);
  formData.append("mobile_country_code", data.mobile_country_code);

  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Registration failed");
  }
  return res.json();
};

// Login
export const login = async (data) => {
  const formData = new FormData();
  formData.append("email", data.email);
  formData.append("password", data.password);

  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login failed");
  }
  return res.json();
};

// Verify Email
export const verifyEmail = async ({ code, token }) => {
  if (!token) throw new Error("No token provided");

  const formData = new FormData();
  formData.append("code", code);

  const res = await fetch(`${BASE_URL}/auth/verify-email`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Verification failed");
  }

  return res.json();
};

// Get User Data
export const getUserData = async () => {
  const token = getToken();
  if (!token) throw new Error("No token found");

  const res = await fetch(`${BASE_URL}/auth/user-data`, {
    method: "GET",
    headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to fetch user data");
  }
  return res.json();
};

// Logout
export const logout = async () => {
  const token = getToken();
  if (!token) return;

  await fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
  });

  removeToken();
};
