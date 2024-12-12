import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../layout/UserContext';


const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useContext(UserContext);
  const history = useHistory();

  const onSubmit = async (data) => {
    try {
      // Simüle edilen bir API çağrısı
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (response.ok) {
        login(result.user); // Kullanıcıyı giriş yapmış olarak kaydet
        if (data.rememberMe) {
          localStorage.setItem('authToken', result.token);
        }
        const previousPage = sessionStorage.getItem('previousPage') || '/';
        history.push(previousPage);
      } else {
        alert(result.message || 'Login failed'); // Toaster ile değiştirilebilir
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className={`border p-2 rounded w-full ${errors.email && 'border-red-500'}`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
              className={`border p-2 rounded w-full ${errors.password && 'border-red-500'}`}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('rememberMe')}
              className="w-4 h-4"
            />
            <label>Remember Me</label>
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 rounded">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
