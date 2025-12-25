"use server";

import { register, login, verifyEmail } from "@/lib/api";

export async function registerAction(formData) {
  try {
    const res = await register({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      password_confirmation: formData.get("password_confirmation"),
      mobile: formData.get("mobile"),
      mobile_country_code: formData.get("mobile_country_code"),
    });

    return {
      success: true,
      data: res.data,
    };
  } catch (err) {
    return {
      success: false,
      message:
        err?.response?.data?.message || err.message || "Registration failed",
    };
  }
}

export async function loginAction(formData) {
  try {
    const res = await login({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    return {
      success: true,
      data: res.data,
    };
  } catch (err) {
    return {
      success: false,
      message:
        err?.response?.data?.message ||
        err.message ||
        "Invalid email or password",
    };
  }
}

export async function verifyAction(formData) {
  try {
    const code = Array.from(formData.entries())
      .filter(([key]) => key.startsWith("otp"))
      .map(([_, value]) => value)
      .join("");

    const token = formData.get("token");
    if (!token) {
      return {
        success: false,
        message: "Session expired, please login again",
      };
    }

    await verifyEmail({ code, token });

    return { success: true };
  } catch (err) {
    return {
      success: false,
      message:
        err?.response?.data?.message ||
        err.message ||
        "Invalid verification code",
    };
  }
}
