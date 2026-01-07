import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  clearTokens,
  getAccessToken,
  setAccessToken,
} from "@/lib/local-storage";
import { axiosInstances } from "@/lib/networkInstance";

export interface User {
  id: number;
  email: string;

  first_name: string;
  last_name: string;

  phone?: string | null;
  linkedin_url?: string | null;

  role: "admin" | "user" | "manager";
  plan_type: "free" | "pro" | "enterprise";

  is_active: boolean;

  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);
export const useAuth = () => useContext(AuthContext)!;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [access_token, set_access_token] = useState<string | null>(null);

  const isAuthenticated = !!user && !!getAccessToken();

  useEffect(() => {
  const token = getAccessToken();

  if (token) {
    set_access_token(token);

    const init = async () => {
      try {
        const { data } = await axiosInstances.get("/auth/me");
        setUser(data);
      } catch (error) {
        clearTokens();
      } finally {
        setLoading(false);
      }
    };

    init();
  } else {
    clearTokens();
    setLoading(false);
  }
}, []); // ✅ runs only once on app start


  const login = async (email: string, password: string) => {
    const form = new URLSearchParams();
    form.append("username", email);
    form.append("password", password);

    const { data } = await axiosInstances.post("/auth/login", form, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    setAccessToken(data.access_token);
    setUser(data.user);
    navigate("/copilot", { replace: true });
  };

  const logout = async () => {
    clearTokens();
    setUser(null);
    navigate("/auth/login", { replace: true });
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
