import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:8082/api/Cart", // Make sure this matches your actual backend URL
});

const CartService = {
  getAll: async () => {
    try {
      const res = await api.get('/');
      return res.data;
    } catch (error) {
      console.error('❌ Error fetching all carts:', error);
      throw error;  // Rethrow for higher-level handling
    }
  },

  getById: async (id) => {
    try {
      const res = await api.get(`/${id}`);
      return res.data;
    } catch (error) {
      console.error(`❌ Error fetching cart with ID ${id}:`, error);
      throw error;
    }
  },

  create: async (userId) => {
    try {
      const res = await api.post('/', { userId });
      console.log('Creating cart for user:', userId);
      return res.data;
    } catch (error) {
      console.error(`❌ Error creating cart for user ${userId}:`, error);
      throw error;  // Throw the error to be handled in the UI
    }
  },

  addItem: async (cartId, item) => {
    try {
      const res = await api.post('/add-item', { cartId, item });
      return res.data;
    } catch (error) {
      console.error(`❌ Error adding item to cart ${cartId}:`, error);
      throw error;
    }
  },

  removeItem: async (cartId, productName) => {
    try {
      const res = await api.delete(`/${cartId}/remove-item/${productName}`);
      return res.data;
    } catch (error) {
      console.error(`❌ Error removing item ${productName} from cart ${cartId}:`, error);
      throw error;
    }
  },

  deleteCart: async (id) => {
    try {
      const res = await api.delete(`/${id}`);
      return res.data;
    } catch (error) {
      console.error(`❌ Error deleting cart ${id}:`, error);
      throw error;
    }
  },

  clearCart: async (userId) => {
    try {
      const res = await api.post(`/clear/${userId}`);
      return res.data;
    } catch (error) {
      console.error(`❌ Error clearing cart for user ${userId}:`, error);
      throw error;
    }
  }
};

export default CartService;
