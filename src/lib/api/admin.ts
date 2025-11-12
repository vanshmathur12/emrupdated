// src/lib/api/admin.ts
import { http } from "./http";

// ADMIN DASHBOARD STATS
// GET /admin/dashboard-stats
export async function getAdminDashboardStats() {
  const res = await http.get("/admin/dashboard-stats");
  return res.data;
}

// CONFIRMATION HISTORY / AUDIT TRAIL
// GET /admin/confirmation-history
export async function getConfirmationHistory(params?: { page?: number; limit?: number }) {
  const res = await http.get("/admin/confirmation-history", { params });
  return res.data;
}

// =====================
// DISEASE TEMPLATES CRUD
// =====================

// POST /admin/disease-template
export async function createDiseaseTemplate(body: {
  diseaseName: string;
  keywords: string[];
  fields: any[];
}) {
  const res = await http.post("/admin/disease-template", body);
  return res.data;
}

// GET /admin/disease-templates
export async function getDiseaseTemplates() {
  const res = await http.get("/admin/disease-templates");
  return res.data;
}

// PUT /admin/disease-template/:templateId
export async function updateDiseaseTemplate(
  templateId: string,
  body: {
    diseaseName: string;
    keywords: string[];
    fields: any[];
  }
) {
  const res = await http.put(`/admin/disease-template/${templateId}`, body);
  return res.data;
}
