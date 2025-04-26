import axios from 'axios';

const backendBaseUrl = 'https://localhost:30600'; 

const baseURL = axios.create({
  baseURL: backendBaseUrl,
});

export default baseURL;