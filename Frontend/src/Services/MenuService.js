import axios from "axios";
import { BASE_URL } from "../Hooks/BaseUrl";

const api = axios.create({
  baseURL: BASE_URL,
});

const MenuService = {
  getAll: () => api.get('/Menu'),
  getById: (id) => api.get(`/Menu/${id}`),
  getByResId: (id) => api.get(`/Menu/getbyresid/${id}`),
  create: (data) => api.post('/Menu', data),
  update: (id, data) => api.put(`/Menu/${id}`, data),
  delete: (id) => api.delete(`/Menu/${id}`),
};

export default MenuService;
