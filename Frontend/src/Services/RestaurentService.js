import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:8081",
});

const RestaurantService = {
  getAll: async () => {
    return await api.get('/Restaurent');
  },

  getById: async (id) => {
    return await api.get(`/Restaurent/${id}`);
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
