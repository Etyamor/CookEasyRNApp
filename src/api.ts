import axios from "axios";

const API_BASE_URL = "https://68b462ba45c9016787703c96.mockapi.io";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getUsers = () => api.get("/users");

export const registerUser = (data: { name: string; email: string; password: string; }) => {
  return api.post("/users", { name: data.name, email: data.email, password: data.password, favorites: [] });
}

export const loginUser = async (data: { email: string; password: string }) => {
  const res = await api.get("/users");
  const user = res.data.find(
    (u: any) => u.email === data.email && u.password === data.password
  );
  if (!user) throw new Error("Invalid credentials");
  return user;
};

export const getUserById = (id: string) => api.get(`/users/${id}`);

export const updateUser = (id: string, data: any) => api.put(`/users/${id}`, data);

export const getRecipes = () => api.get("/recipes");

export const getRecipeById = (id: string) => api.get(`/recipes/${id}`);

export const createRecipe = (data: { title: string; description: string; image?: string }) =>
  api.post("/recipes", data);

export const addFavorite = async (userId: string, recipeId: string) => {
  const { data: user } = await getUserById(userId);
  const favorites = user.favorites || [];
  if (favorites.includes(recipeId)) return user;
  const updated = { ...user, favorites: [...favorites, recipeId] };
  return updateUser(userId, updated);
};

// Remove recipe from user's favorites
export const removeFavorite = async (userId: string, recipeId: string) => {
  const { data: user } = await getUserById(userId);
  const favorites = (user.favorites || []).filter((id: string) => id !== recipeId);
  const updated = { ...user, favorites };
  return updateUser(userId, updated);
};

export const toggleFavorite = async (userId: string, recipeId: string) => {
  const { data: user } = await getUserById(userId);
  const favorites = user.favorites || [];
  if (favorites.includes(recipeId)) {
    return removeFavorite(userId, recipeId);
  } else {
    return addFavorite(userId, recipeId);
  }
};
