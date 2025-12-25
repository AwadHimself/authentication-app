"use server";

import { register, login, verifyEmail } from "@/lib/api";
import { redirect } from "next/navigation";

export async function registerAction(formData) {
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    password_confirmation: formData.get("password_confirmation"),
    mobile: formData.get("mobile"),
    mobile_country_code: formData.get("mobile_country_code"),
  };

  try {
    const res = await register(data);
    return res;
  } catch (err) {
    throw new Error(err.message || "Registration failed");
  }
}

export async function loginAction(formData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const res = await login(data);
    return res;
  } catch (err) {
    throw new Error(err.message || "Login failed");
  }
}

export async function verifyAction(formData) {
  const code = Array.from(formData.entries())
    .filter(([key]) => key.startsWith("otp"))
    .map(([_, value]) => value)
    .join("");

  const token = formData.get("token");
  if (!token) throw new Error("No token found");

  try {
    await verifyEmail({ code, token });
  } catch (err) {
    throw new Error(err.message || "Verification failed");
  }
}
