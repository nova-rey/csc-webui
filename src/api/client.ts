import axios from "axios";

const baseURL = import.meta.env.VITE_CSC_BASE_URL || "http://localhost:8080/api/v1";
const token = import.meta.env.VITE_CSC_TOKEN;

export const api = axios.create({
  baseURL,
  headers: token ? { Authorization: `Bearer ${token}` } : {},
});

export async function getSpecs() {
  const res = await api.get("/spec");
  return res.data;
}
