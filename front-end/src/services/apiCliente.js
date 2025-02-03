import axios from 'axios';
import store from '../store'; // Importa a Redux store para acessar o token

// Cria uma instância do Axios
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // URL base do seu backend
});

// Interceptor para adicionar o token JWT
apiClient.interceptors.request.use((config) => {
  const token = store.getState().auth.token; // Busca o token no Redux state
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default apiClient;
