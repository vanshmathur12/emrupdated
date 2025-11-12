// src/lib/api/catalog.ts
import { http } from "./http";

// PUBLIC / PATIENT-FACING DIRECTORY DATA
// These map to external API proxy routes in user.js

// GET /user/doctors
// optional params: specialization, cityId, etc.
export async function getDoctors(params?: Record<string, any>) {
  const res = await http.get("/user/doctors", { params });
  return res.data;
}

// GET /user/doctors/:id
export async function getDoctorById(id: string) {
  const res = await http.get(`/user/doctors/${id}`);
  return res.data;
}

// GET /user/hospitals
// supports filtering by cityId and hospitalGroupId
export async function getHospitals(params?: { cityId?: string; hospitalGroupId?: string }) {
  const res = await http.get("/user/hospitals", { params });
  return res.data;
}

// GET /user/hospitals/:id
export async function getHospitalById(id: string) {
  const res = await http.get(`/user/hospitals/${id}`);
  return res.data;
}

// GET /user/hospital-groups
export async function getHospitalGroups() {
  const res = await http.get("/user/hospital-groups");
  return res.data;
}

// GET /user/cities
export async function getCities() {
  const res = await http.get("/user/cities");
  return res.data;
}

// GET /user/specializations
export async function getSpecializations() {
  const res = await http.get("/user/specializations");
  return res.data;
}
