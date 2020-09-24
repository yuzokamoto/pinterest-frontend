import React, { useState, useEffect, useContext } from "react";
import { createContext } from "react";
import api from "../services/api";
import { loginRequest } from "../services/auth";

export interface User {
  name: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  login(body: object): Promise<void>;
  logout(): void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storagedUser = localStorage.getItem("user");
    const storagedToken = localStorage.getItem("token");

    if (storagedUser && storagedToken) {
      setUser(JSON.parse(storagedUser));
      api.defaults.headers["Authorization"] = `Bearer ${storagedToken}`;
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  async function login(body: object) {
    setLoading(true);
    const response = await loginRequest(body);
    response.user ? setUser(response.user) : setUser(null);
    localStorage.setItem("user", JSON.stringify(response.user));
    localStorage.setItem("token", response.token || JSON.stringify(undefined));
    api.defaults.headers["Authorization"] = `Bearer ${response.token}`;
    setLoading(false);
  }

  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    api.defaults.headers["Authorization"] = undefined;
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
