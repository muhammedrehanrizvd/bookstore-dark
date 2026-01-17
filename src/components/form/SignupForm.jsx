import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import FormInput from './FormInput';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../App/slices/authSlice'; // Ye thunk import karo
import AuthCard from './AuthCard';
import { NavLink } from 'react-router';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
// Form Validation Schema
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least 1 uppercase, 1 lowercase, and 1 number'
    ),
});

function SignupForm() {
  const dispatch = useDispatch();
const navigate = useNavigate();
  // Redux state
  const { loading, error, user , isAuthenticated } = useSelector((state) => state.auth);

  const methods = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
  });
  const { reset } = methods;

  const onSubmit = async (data) => {
    // Dispatch thunk
    const resultAction = await dispatch(
      signup({ name: data.name, email: data.email, password: data.password })
    );

    // Check if signup successful
    if (signup.fulfilled.match(resultAction)) {
      reset();
    }
    // Error will automatically be in Redux state (error)
  };
  useEffect(() => {
  if (isAuthenticated) {
    navigate("/");
  }
}, [isAuthenticated, navigate]);


  return (
    <AuthCard
      title="Join Our Reading Community"
      subtitle="Get personalized recommendations, updates & exclusive resources"
      footer={
        <>
          Already have an account?{' '}
          <NavLink to="/login" className="text-purple-300 hover:underline">
            Log in
          </NavLink>
        </>
      }
    >
      {error && <div className="mb-6 p-4 rounded-xl bg-red-500/20 text-red-300">{error}</div>}
     {!loading && !error && isAuthenticated && (
  <div className="mb-6 p-4 rounded-xl bg-green-500/20 text-green-300">
    🎉 Account created! Check email.
  </div>
)}


      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          <FormInput name="name" type="text" placeholder="Full Name" />
          <FormInput name="email" type="email" placeholder="Email" />
          <FormInput name="password" type="password" placeholder="Password" />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xl rounded-xl hover:scale-105 transition"
          >
            {loading ? 'Creating...' : 'Sign Up'}
          </button>
        </form>
      </FormProvider>
    </AuthCard>
  );
}

export default SignupForm;
