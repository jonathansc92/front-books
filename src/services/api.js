import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:8626",
});

export default api;