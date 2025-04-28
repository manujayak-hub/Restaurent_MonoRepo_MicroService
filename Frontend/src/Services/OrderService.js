import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8082/api/order",
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

   getByCustomerId: async (customerId) => {
    return await api.get(`/customer/${customerId}`);
  },

  getByRestaurantId: async (restaurantId) => {
    return await api.get(`/restaurant/${restaurantId}`);
  },

  getbystatusandid: async (status,id) => {
    return await api.get(`/status/${status}/${id}`)
  },

  getbystatus: async (status) => {
    return await api.get(`/status/${status}`)
  },

  updaterecord: async (orderId, status) => {
    return await api.patch(`/${orderId}?recordstatus=${status}`);
  }
  
  
};

export default OrderService;
