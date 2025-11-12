// src/lib/api/auth.ts
import { http } from "./http";

export interface SignInPayload {
  username?: string; // doctor/admin use username
  email?: string;    // user uses email
  password: string;
}

export interface SignInResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: any;
}

export interface SignUpUserPayload {
  username: string;
  email: string;
  password: string;
  phone?: string;
}

export interface SignUpDoctorPayload {
  username: string;
  password: string;
  doctorInfo: {
    fullName?: string;
    specialization?: string;
    experience?: number;
    qualification?: string;
    hospitalName?: string;
    contactNumber?: string;
    email?: string;
    consultationFee?: number;
    availableTime?: string;
    profileImage?: string | null;
    bio?: string;
  };
}

export interface SignUpAdminPayload {
  username: string;
  password: string;
  email: string;
  role?: "admin" | "superadmin";
  hospitalId?: string;
  cityId?: string;
  hospitalGroupId?: string;
  hospitalName?: string;
}

// ---------------- USER AUTH ----------------

export async function userSignUp(data: SignUpUserPayload) {
  const res = await http.post("/user/signup", data);
  return res.data;
}

export async function userSignIn(data: { email: string; password: string }): Promise<SignInResponse> {
  const res = await http.post("/user/signin", data);
  return res.data;
}

export async function userForgotPassword(email: string) {
  const res = await http.post("/user/forgot-password", { email });
  return res.data;
}

export async function userResetPassword(
  token: string,
  payload: { password: string; confirmPassword: string }
) {
  const res = await http.post(`/user/reset-password/${token}`, payload);
  return res.data;
}

export async function userChangePassword(payload: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}) {
  const res = await http.post("/user/change-password", payload);
  return res.data;
}

// ---------------- DOCTOR AUTH ----------------

export async function doctorSignUp(data: SignUpDoctorPayload) {
  const res = await http.post("/doctor/signup", data);
  return res.data;
}

export async function doctorSignIn(data: { username: string; password: string }): Promise<SignInResponse> {
  const res = await http.post("/doctor/signin", data);
  return res.data;
}

export async function doctorForgotPassword(email: string) {
  const res = await http.post("/doctor/forgot-password", { email });
  return res.data;
}

export async function doctorResetPassword(
  token: string,
  payload: { password: string; confirmPassword: string }
) {
  const res = await http.post(`/doctor/reset-password/${token}`, payload);
  return res.data;
}

export async function doctorChangePassword(payload: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}) {
  const res = await http.post("/doctor/change-password", payload);
  return res.data;
}

// ---------------- ADMIN AUTH ----------------

export async function adminSignUp(data: SignUpAdminPayload) {
  const res = await http.post("/admin/signup", data);
  return res.data;
}

export async function adminSignIn(data: { username: string; password: string }): Promise<SignInResponse> {
  const res = await http.post("/admin/signin", data);
  return res.data;
}

// ---------------- SESSION MGMT ----------------

export async function refreshAccessToken(role: "user" | "doctor" | "admin") {
  // all 3 routers expose /refresh-token endpoints
  const res = await http.post(`/${role}/refresh-token`);
  return res.data;
}

export async function logout(role: "user" | "doctor" | "admin") {
  const res = await http.post(`/${role}/logout`);
  return res.data;
}

// Optional helper to persist session client-side
export function storeSession(res: SignInResponse) {
  localStorage.setItem("accessToken", res.accessToken);
  localStorage.setItem("refreshToken", res.refreshToken);
  localStorage.setItem("user", JSON.stringify(res.user));
}

export function clearSession() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
}
