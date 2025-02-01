import axios from 'axios';
import { loginSuccess } from '../slices/loginSlice';

const API_URL = 'http://localhost:3000/api/auth/login'; // Substitua pelo seu backend

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(API_URL, { email, password });

    // Supondo que o backend retorne { token, user }
    const { token, user } = response.data;

    // Atualiza o Redux state
    dispatch(loginSuccess({ user, token }));
  } catch (error) {
    console.error('Erro no login:', error.response?.data || error.message);
    throw error; // Lança o erro para que o componente exiba mensagens
  }
};
