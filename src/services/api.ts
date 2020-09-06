import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.100.52:5000'
});

export default api;