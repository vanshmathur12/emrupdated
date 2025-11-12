// src/hooks/useDoctorDashboard.ts
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getDoctorDashboard,
} from "@/lib/api/doctor";
import {
  getDoctorTodaysSchedule,
  getDoctorPendingAppointments,
  completeAppointment,
} from "@/lib/api/appointments";

// doctor dashboard metrics
export function useDoctorDashboardData() {
  return useQuery({
    queryKey: ["doctorDashboard"],
    queryFn: getDoctorDashboard,
  });
}

// doctor's today's confirmed schedule
export function useDoctorSchedule() {
  return useQuery({
    queryKey: ["doctorSchedule"],
    queryFn: getDoctorTodaysSchedule,
  });
}

// doctor's pending (unconfirmed) appointments
export function useDoctorPending(params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: ["doctorPending", params],
    queryFn: () => getDoctorPendingAppointments(params),
  });
}

// mutation to mark an appointment completed
export function useCompleteAppointment() {
  return useMutation({
    mutationFn: (appointmentId: string) => completeAppointment(appointmentId),
  });
}
