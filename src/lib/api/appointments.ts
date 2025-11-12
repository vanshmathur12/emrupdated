// src/lib/api/appointments.ts
import { http } from "./http";

// ========== USER SIDE APPOINTMENTS ==========

export interface BookAppointmentPayload {
  doctorId: string;
  hospitalId: string;
  hospitalGroupId?: string;
  cityId: string;
  date: string; // e.g. "2025-10-28" or ISO
  time: string; // timeslot string your backend expects
  reason?: string;
}

// POST /user/book-appointment
// Requires logged-in user token
export async function bookAppointment(body: BookAppointmentPayload) {
  const res = await http.post("/user/book-appointment", body);
  return res.data;
}

// (If later you expose "my appointments" etc, add here)


// ========== DOCTOR SIDE APPOINTMENTS ==========

export interface PendingAppointmentsQuery {
  page?: number;
  limit?: number;
}

// GET /doctor/pending-appointments
export async function getDoctorPendingAppointments(params?: PendingAppointmentsQuery) {
  const res = await http.get("/doctor/pending-appointments", { params });
  return res.data;
}

// GET /doctor/todays-schedule
export async function getDoctorTodaysSchedule() {
  const res = await http.get("/doctor/todays-schedule");
  return res.data;
}

// PUT /doctor/appointment/:appointmentId/complete
export async function completeAppointment(appointmentId: string) {
  const res = await http.put(`/doctor/appointment/${appointmentId}/complete`);
  return res.data;
}


// ========== ADMIN SIDE APPOINTMENTS ==========

export interface SearchAppointmentsQuery {
  doctorId?: string;
  status?: string; // pending | confirmed | etc
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

// GET /admin/appointments/search
export async function adminSearchAppointments(params?: SearchAppointmentsQuery) {
  const res = await http.get("/admin/appointments/search", { params });
  return res.data;
}

// GET /admin/all-appointments
export async function adminGetAllAppointments(params?: { page?: number; limit?: number; status?: string }) {
  const res = await http.get("/admin/all-appointments", { params });
  return res.data;
}

// DELETE /admin/appointment/:appointmentId
export async function adminDeleteAppointment(appointmentId: string) {
  const res = await http.delete(`/admin/appointment/${appointmentId}`);
  return res.data;
}

// POST /admin/scan-appointment
// body: { code: string; method: "QR_SCAN" | "NUMERIC_CODE" }
export async function adminScanAppointment(payload: { code: string; method: "QR_SCAN" | "NUMERIC_CODE" }) {
  const res = await http.post("/admin/scan-appointment", payload);
  return res.data;
}

// POST /admin/confirm-appointment/:appointmentId
export async function adminConfirmAppointment(
  appointmentId: string,
  body: { method: string; notes?: string }
) {
  const res = await http.post(`/admin/confirm-appointment/${appointmentId}`, body);
  return res.data;
}
