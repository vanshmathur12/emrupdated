// src/hooks/useCatalog.ts
import { useQuery } from "@tanstack/react-query";
import {
  getDoctors,
  getDoctorById,
  getHospitals,
  getHospitalById,
  getHospitalGroups,
  getCities,
  getSpecializations,
} from "@/lib/api/catalog";

export function useDoctors(params?: Record<string, any>) {
  return useQuery({
    queryKey: ["doctors", params],
    queryFn: () => getDoctors(params),
  });
}

export function useDoctorDetail(id: string) {
  return useQuery({
    queryKey: ["doctor", id],
    queryFn: () => getDoctorById(id),
    enabled: !!id,
  });
}

export function useHospitals(params?: { cityId?: string; hospitalGroupId?: string }) {
  return useQuery({
    queryKey: ["hospitals", params],
    queryFn: () => getHospitals(params),
  });
}

export function useHospitalDetail(id: string) {
  return useQuery({
    queryKey: ["hospital", id],
    queryFn: () => getHospitalById(id),
    enabled: !!id,
  });
}

export function useHospitalGroups() {
  return useQuery({
    queryKey: ["hospitalGroups"],
    queryFn: getHospitalGroups,
  });
}

export function useCities() {
  return useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
  });
}

export function useSpecializations() {
  return useQuery({
    queryKey: ["specializations"],
    queryFn: getSpecializations,
  });
}
