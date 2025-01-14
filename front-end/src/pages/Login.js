import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../slices/loginSlice';
import { useNavigate } from 'react-router-dom';

// Esquema de validação com Yup
const schema = yup.object().shape({
  email: yup
    .string()
    .email('Insira um email válido.')
    .required('O email é obrigatório.'),
  senha: yup.string().required('A senha é obrigatória.'),
});

const users = [
  { email: "admin@gamelog.com", password: "admin123", role: "admin" },
  { email: "user1@gamelog.com", password: "user123", role: "user" },
];


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

  const onSubmit = (data) => {
    const user = users.find(
      (u) => u.email === data.email && u.password === data.senha
    );
  
    if (user) {
      // Salvar informações do usuário no Redux ou localStorage
      dispatch(login({ email: user.email, role: user.role }));
      alert("Login realizado com sucesso!");
  
      // Redirecionar com base no papel do usuário
      if (user.role === "admin") {
        navigate("/admin"); // Redirecionar para a página de administração
      } else {
        navigate("/"); // Redirecionar para a página principal
      }
    } else {
      alert("Email ou senha inválidos.");
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
