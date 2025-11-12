// src/lib/api/doctor.ts
import { http } from "./http";

// GET /doctor/dashboard
// Returns doctor stats: today's appointments, totalPatients30Days, etc.
export async function getDoctorDashboard() {
  const res = await http.get("/doctor/dashboard");
  return res.data;
}
