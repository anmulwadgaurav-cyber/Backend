//yahi file backend se connect karegi related to authentication
import axios from "axios";

//to avoid redundancy
const api = axios.create({
  baseURL: "http://localhost:8000/api/auth",
  withCredentials: true,
});

export async function register(username, email, password) {
  try {
    const response = await api.post("/register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function login(username, password) {
  try {
    const response = await api.post("/login", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function getMe(username, password) {
  try {
    const response = await api.post("/get-me", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
