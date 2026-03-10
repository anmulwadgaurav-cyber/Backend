import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

export async function getSong({ mood }) {
  const response = await api.get("/api/songs?mood=" + mood);
  return response.data;
}
