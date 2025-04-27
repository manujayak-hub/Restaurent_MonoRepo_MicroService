// src/services/deliveryService.js
import axios from 'axios';

const API_URL = 'http://localhost:5272/api/delivery';

export const getCompletedDeliveries = async () => {
  try {
    const response = await axios.get(`${API_URL}/complete`);
    return response.data;
  } catch (error) {
    console.error("Error fetching completed deliveries:", error);
    throw error;
  }
};

export const getDeliveryById = async (deliveryId) => {
  try {
    const response = await axios.get(`${API_URL}/${deliveryId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching delivery with ID ${deliveryId}:`, error);
    throw error;
  }
};

export const completeDelivery = async (deliveryId) => {
  try {
    const response = await axios.put(`${API_URL}/${deliveryId}/complete`);
    return response.data;
  } catch (error) {
    console.error(`Error completing delivery with ID ${deliveryId}:`, error);
    throw error;
  }
};
