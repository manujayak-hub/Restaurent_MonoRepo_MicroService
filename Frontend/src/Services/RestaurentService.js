import axios from "axios";
import { BASE_URL } from "../Hooks/BaseUrl";

const api = axios.create({
  baseURL: BASE_URL,
});

const RestaurantService = {
  getAll: async () => {
    return await api.get('/Restaurent');
  },

  getById: async (id) => {
    return await api.get(`/Restaurent/${id}`);
  },

  getbyowner: async (id) => {
    return await api.get(`/Restaurent/resowner/${id}`);
  },

  create: async (restaurantData) => {
    return await api.post('/Restaurent', restaurantData);
  },

  update: async (id, updatedData) => {
    return await api.put(`/Restaurent/${id}`, updatedData);
  },

  delete: async (id) => {
    return await api.delete(`/Restaurent/${id}`);
  },
};

export default RestaurantService;
