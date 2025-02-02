import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../actions/authActions'; // Ação de login
import { useNavigate } from 'react-router-dom';

// Esquema de validação com Yup
const schema = yup.object().shape({
  email: yup
    .string()
    .email('Insira um email válido.')
    .required('O email é obrigatório.'),
  senha: yup.string().required('A senha é obrigatória.'),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema), // Conecta o Yup ao React Hook Form
  });

  const onSubmit = async (data) => {
    try {
      // Envia os dados do login para a ação que se conecta ao backend
      await dispatch(login(data.email, data.senha));
  
      // Redireciona com base no papel do usuário
      const { role } = JSON.parse(localStorage.getItem('user'));
      if (role === 'admin') {
        navigate('/admin'); // Página de administração
      } else {
        navigate('/'); // Página principal
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Erro ao fazer login.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {/* Campo Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className={`mt-1 block w-full px-4 py-2 border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Campo Senha */}
        <div className="mb-4">
          <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
            Senha
          </label>
          <input
            type="password"
            id="senha"
            {...register('senha')}
            className={`mt-1 block w-full px-4 py-2 border ${
              errors.senha ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {errors.senha && (
            <p className="text-red-500 text-sm mt-1">{errors.senha.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
