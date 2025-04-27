// CartService.js

import axios from 'axios';

const BASE_URL = 'http://localhost:8082/api/Cart';  // Adjust if needed

const CartService = {
  create: async ({ userId }) => {
    try {
      const response = await axios.post(`${BASE_URL}/create`, {
        userId: userId,
      });
      console.log('✅ Cart created:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Failed to create cart:', error);
      return null;
    }
  },

  addItem: async (cartId, item) => {
    try {
      const response = await axios.post(`${BASE_URL}/add-item`, {
        cartId,
        item
      });
      console.log('✅ Item added:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error adding item to cart:', error);
      throw error;
    }
  },

  removeItem: async (cartId, productName) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${cartId}/remove-item/${productName}`);
      console.log('✅ Item removed:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error removing item from cart:', error);
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await axios.get(`${BASE_URL}`);
      console.log('✅ All carts fetched');
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching all carts:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      console.log(`✅ Cart ${id} fetched`);
      return response.data;
    } catch (error) {
      console.error(`❌ Error fetching cart with ID ${id}:`, error);
      throw error;
    }
  },

  deleteCart: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`);
      console.log(`✅ Cart ${id} deleted`);
      return response.data;
    } catch (error) {
      console.error(`❌ Error deleting cart ${id}:`, error);
      throw error;
    }
  },

  clearCart: async (userId) => {
    try {
      const response = await axios.post(`${BASE_URL}/clear/${userId}`);
      console.log(`✅ Cart cleared for user ${userId}`);
      return response.data;
    } catch (error) {
      console.error(`❌ Error clearing cart for user ${userId}:`, error);
      throw error;
    }
  }
};

export default CartService;
