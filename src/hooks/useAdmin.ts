// src/hooks/useAdmin.ts
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getAdminDashboardStats,
  getConfirmationHistory,
  createDiseaseTemplate,
  getDiseaseTemplates,
  updateDiseaseTemplate,
} from "@/lib/api/admin";

import {
  adminSearchAppointments,
  adminGetAllAppointments,
  adminDeleteAppointment,
  adminScanAppointment,
  adminConfirmAppointment,
} from "@/lib/api/appointments";

// high-level dashboard KPIs
export function useAdminDashboard() {
  return useQuery({
    queryKey: ["adminDashboard"],
    queryFn: getAdminDashboardStats,
  });
}

// confirmation / verification log
export function useConfirmationHistory(params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: ["confirmationHistory", params],
    queryFn: () => getConfirmationHistory(params),
  });
}

// disease templates list
export function useDiseaseTemplates() {
  return useQuery({
    queryKey: ["diseaseTemplates"],
    queryFn: getDiseaseTemplates,
  });
}

// create new disease template
export function useCreateDiseaseTemplate() {
  return useMutation({
    mutationFn: (body: {
      diseaseName: string;
      keywords: string[];
      fields: any[];
    }) => createDiseaseTemplate(body),
  });
}

// update existing disease template
export function useUpdateDiseaseTemplate() {
  return useMutation({
    mutationFn: (vars: {
      templateId: string;
      diseaseName: string;
      keywords: string[];
      fields: any[];
    }) =>
      updateDiseaseTemplate(vars.templateId, {
        diseaseName: vars.diseaseName,
        keywords: vars.keywords,
        fields: vars.fields,
      }),
  });
}

// admin appointment search
export function useAdminAppointmentsSearch(params?: any) {
  return useQuery({
    queryKey: ["adminAppointmentsSearch", params],
    queryFn: () => adminSearchAppointments(params),
  });
}

// admin view all appointments + stats card breakdown
export function useAdminAllAppointments(params?: { page?: number; limit?: number; status?: string }) {
  return useQuery({
    queryKey: ["adminAllAppointments", params],
    queryFn: () => adminGetAllAppointments(params),
  });
}

// delete appointment (admin)
export function useAdminDeleteAppointment() {
  return useMutation({
    mutationFn: (appointmentId: string) => adminDeleteAppointment(appointmentId),
  });
}

// scan QR / numeric code to look up an appointment
export function useAdminScanAppointment() {
  return useMutation({
    mutationFn: (body: { code: string; method: "QR_SCAN" | "NUMERIC_CODE" }) =>
      adminScanAppointment(body),
  });
}

// confirm an appointment
export function useAdminConfirmAppointment() {
  return useMutation({
    mutationFn: (vars: { appointmentId: string; method: string; notes?: string }) =>
      adminConfirmAppointment(vars.appointmentId, {
        method: vars.method,
        notes: vars.notes,
      }),
  });
}
