// src/components/auth/LoginForm.jsx
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import FormInput from './FormInput';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../App/slices/authSlice';
import AuthCard from './AuthCard';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});

function LoginForm() {
 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, user, error ,isAuthenticated} = useSelector((state) => state.auth);
  console.log('user:', user);
console.log('isAuthenticated:', isAuthenticated);

  const methods = useForm({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit =  (data) => {
     dispatch(login(data));
  };
useEffect(() => {
  if (isAuthenticated) {
    navigate("/dashboard");
  }
}, [isAuthenticated, navigate]);


  return (
    <AuthCard
      title="Welcome Back"
      subtitle="Log in to access your reading list & recommendations"
      footer={
        <>
          Don't have an account?{' '}
          <NavLink to="/signup" className="text-purple-300 hover:underline">
            Sign up
          </NavLink>
        </>
      }
    >
      {error && <div className="mb-6 p-4 rounded-xl bg-red-500/20 text-red-300">{error}</div>}

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          <FormInput name="email" type="email" placeholder="Email" />
          <FormInput name="password" type="password" placeholder="Password" />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xl rounded-xl hover:scale-105 transition"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
      </FormProvider>
    </AuthCard>
  );
}

export default LoginForm;