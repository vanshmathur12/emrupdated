// src/hooks/useAuth.ts
import { useMutation } from "@tanstack/react-query";
import {
  userSignIn,
  doctorSignIn,
  adminSignIn,
  SignInResponse,
  storeSession,
} from "@/lib/api/auth";

// these hooks trigger login and store tokens on success

export function useUserLogin() {
  return useMutation({
    mutationFn: (payload: { email: string; password: string }) =>
      userSignIn(payload),
    onSuccess: (res: SignInResponse) => {
      storeSession(res);
    },
  });
}

export function useDoctorLogin() {
  return useMutation({
    mutationFn: (payload: { username: string; password: string }) =>
      doctorSignIn(payload),
    onSuccess: (res: SignInResponse) => {
      storeSession(res);
    },
  });
}

export function useAdminLogin() {
  return useMutation({
    mutationFn: (payload: { username: string; password: string }) =>
      adminSignIn(payload),
    onSuccess: (res: SignInResponse) => {
      storeSession(res);
    },
  });
}
