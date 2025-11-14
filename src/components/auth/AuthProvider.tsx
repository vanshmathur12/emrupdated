import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userSignIn, adminSignIn, doctorSignIn, storeSession, clearSession } from '@/lib/api/auth';

export type UserRole = 'doctor' | 'patient' | 'admin' | 'hr' | 'nurse' | 'receptionist';

export interface User {
  id: string;
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  permissions?: string[];
  department?: string;
}

interface AuthContextType {
  user: User | null;
  login: (emailOrUsername: string, password: string, role?: UserRole) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => void; // keep as demo helper
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = async (emailOrUsername: string, password: string, role?: UserRole) => {
    // Attempt real backend authentication based on role
    try {
      let res: any;

      if (role === 'admin') {
        // backend expects username for admin
        res = await adminSignIn({ username: emailOrUsername, password });
      } else if (role === 'doctor') {
        res = await doctorSignIn({ username: emailOrUsername, password });
      } else {
        // default to user (patient) signin using email
        res = await userSignIn({ email: emailOrUsername, password });
      }

      // Require an explicit success flag + access token from the backend
      if (res && res.success && res.accessToken) {
        storeSession(res as any);
        setUser({ ...(res.user as User), role: (res.user?.role as UserRole) || (role || 'patient') });
        
        // Redirect to dashboard after successful login
        navigate('/dashboard');
      } else {
        const message = res?.message || 'Invalid credentials';
        throw new Error(message);
      }
    } catch (err) {
      // Clear any partial session
      clearSession();
      setUser(null);
      throw err;
    }
  };

  const logout = () => {
    clearSession();
    setUser(null);
  };

  // keep a demo-only role switch helper (does not authenticate)
  const switchRole = (role: UserRole) => {
    // minimal demo representation
    setUser({ id: role, role, email: `${role}@demo`, name: `${role.charAt(0).toUpperCase() + role.slice(1)} (Demo)` });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}