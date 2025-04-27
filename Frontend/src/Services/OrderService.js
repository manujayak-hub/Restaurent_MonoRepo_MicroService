import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8082/api/Order",
});

const OrderService = {
  getAll: async () => {
    return await api.get('/');
  },

  getById: async (id) => {
    return await api.get(`/${id}`);
  },

  create: async (orderData) => {
    return await api.post('/', orderData);
  },

  update: async (id, updatedData) => {
    return await api.put(`/${id}`, updatedData);
  },

  delete: async (id) => {
    return await api.delete(`/${id}`);
  },
};

export default OrderService;
