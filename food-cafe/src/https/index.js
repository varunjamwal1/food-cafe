import axios from "axios";

/* Axios Instance */
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/* ================= AUTH APIs ================= */

export const loginUser = (data) => api.post("/api/user/login", data);

export const registerUser = (data) => api.post("/api/user/register", data);

export const getUserData = () => api.get("/api/user");

export const logout = () => api.post("/api/user/logout");
/* ================= ORDER APIs ================= */

export const createOrder = (data) => api.post("/api/orders", data);

export const getOrders = () => api.get("/api/orders");

export const getSingleOrder = (id) => api.get(`/api/orders/${id}`);

export const updateOrder = (id, data) => api.put(`/api/orders/${id}`, data);

/* ================= TABLE APIs ================= */

export const createTable = (data) => api.post("/api/tables", data);

export const getTables = () => api.get("/api/tables");

export const updateTable = (id, data) => api.put(`/api/tables/${id}`, data);

/* export instance (optional) */
export default api;
