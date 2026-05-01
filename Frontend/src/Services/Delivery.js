// src/services/deliveryService.js
import axios from 'axios';
import { BASE_URL } from '../Hooks/BaseUrl';


export const getCompletedDeliveries = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/delivery/completed`);
    return response.data;
  } catch (error) {
    console.error("Error fetching completed deliveries:", error);
    throw error;
  }
};

export const getDeliveryById = async (deliveryId) => {
  try {
    const response = await axios.get(`${BASE_URL}/delivery/${deliveryId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching delivery with ID ${deliveryId}:`, error);
    throw error;
  }
};

export const completeDelivery = async (deliveryId) => {
  try {
    const response = await axios.put(`${BASE_URL}/delivery/${deliveryId}/complete`);
    return response.data;
  } catch (error) {
    console.error(`Error completing delivery with ID ${deliveryId}:`, error);
    throw error;
  }
};
