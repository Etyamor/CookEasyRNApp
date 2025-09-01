import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getRecipes,
  loginUser,
  addFavorite,
  removeFavorite,
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

interface Recipe {
  id: string;
  name: string;
  category: string;
  time: number;
  image?: string;
  ingredients: string[];
  steps: string[];
}

interface AppContextType {
  user: User | null;
  recipes: Recipe[];
  favorites: string[];
  loading: boolean;
  initializing: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, confirm_password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshRecipes: () => Promise<void>;
  addToFavorites: (recipeId: string) => Promise<void>;
  removeFromFavorites: (recipeId: string) => Promise<void>;
  toggleFavorite: (recipeId: string) => Promise<void>;
  getFavorites: () => Recipe[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
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

  const refreshRecipes = async () => {
    setLoading(true);
    try {
      const res = await getRecipes();
      setRecipes(res.data);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (recipeId: string) => {
    if (!user) return;
    const updated = await addFavorite(user.id, recipeId);
    setUser(updated.data);
    await AsyncStorage.setItem("user", JSON.stringify(updated.data));
  };

  const removeFromFavorites = async (recipeId: string) => {
    if (!user) return;
    const updated = await removeFavorite(user.id, recipeId);
    setUser(updated.data);
    await AsyncStorage.setItem("user", JSON.stringify(updated.data));
  };

  const toggleFavorite = async (recipeId: string) => {
    if (!user) return;
    const isFav = user.favorites?.includes(recipeId);
    if (isFav) {
      await removeFromFavorites(recipeId);
    } else {
      await addToFavorites(recipeId);
    }
  };

  const getFavorites = () => {
    if (!user || !recipes.length) return [];
    return recipes.filter(r => user.favorites?.includes(r.id));
  }

  return (
    <AppContext.Provider
      value={{
        user,
        recipes,
        favorites: user?.favorites || [],
        loading,
        initializing,
        login,
        register,
        logout,
        refreshRecipes,
        addToFavorites,
        removeFromFavorites,
        toggleFavorite,
        getFavorites,
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
