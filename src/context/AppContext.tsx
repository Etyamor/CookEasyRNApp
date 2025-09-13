import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  loginUser,
  registerUser,
} from '../api';

// Types
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  favorites?: string[];
}

interface AppContextType {
  user: User | null;
  loading: boolean;
  initializing: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, confirm_password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  // Load user from storage on app start
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem("user");
        if (stored) {
          setUser(JSON.parse(stored));
        }
      } finally {
        setInitializing(false);
      }
    })();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const u = await loginUser({ email, password });
      setUser(u);
      await AsyncStorage.setItem("user", JSON.stringify(u));
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      await registerUser({ name, email, password });
    } finally {
      setLoading(false);
    }
  }

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("user");
  };

  return (
    <AppContext.Provider
      value={{
        user,
        loading,
        initializing,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
