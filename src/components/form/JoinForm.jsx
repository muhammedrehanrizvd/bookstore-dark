import React, { useState } from 'react';
import { useForm,FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import FormInput from './FormInput';

// Form Validation Schema using Zod (best practice)
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

function JoinForm() {
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const methods = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onBlur', // Validate on blur for better UX
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log('Form submitted successfully:', data);

    setIsSubmitting(false);
    setSubmitSuccess(true);
    reset(); // Clear form after success

    // Auto hide success message after 5 seconds
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-black flex items-center justify-center px-6 py-12">
      <div className="
        max-w-md w-full
        bg-white/5 backdrop-blur-xl
        rounded-3xl
        border border-white/10
        shadow-2xl shadow-purple-900/30
        p-8 md:p-12
        text-center
        transition-all duration-500
      ">
        {/* Header */}
        <div className="mb-10">
          <h1 className="
            text-4xl md:text-5xl font-bold
            bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400
            bg-clip-text text-transparent
            drop-shadow-2xl
          ">
            Join Our Reading Community
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Get personalized book recommendations, exclusive updates, early access to new releases & special resources for book lovers.
          </p>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="
            mb-6 p-4 rounded-xl
            bg-green-500/20 border border-green-500/50
            text-green-300 font-medium
            animate-in fade-in slide-in-from-top duration-500
          ">
            🎉 Welcome aboard! Check your email to confirm your account.
          </div>
        )}
          
        {/* Form */}
        <FormProvider {...methods}>

        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          {/* Full Name */}
          <FormInput type={'text'} placeholder={'Full Name'} name={'name'}/>

          {/* Email */}
        <FormInput type={'text'} placeholder={' Email'} name={'email'} />

          {/* Password */}
          <FormInput type={'password'} placeholder={' Enter Password'} name={'password'} />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="
              w-full py-5 mt-8
              bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600
              hover:from-purple-500 hover:via-pink-500 hover:to-blue-500
              disabled:opacity-70 disabled:cursor-not-allowed
              text-white font-bold text-xl
              rounded-xl
              shadow-2xl shadow-purple-600/50
              hover:shadow-pink-600/60
              hover:scale-105
              transition-all duration-500
              relative overflow-hidden group
            "
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Joining...
                </>
              ) : (
                'Submit to Join'
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </button>
        </form>
        </FormProvider>

        {/* Footer Text */}
        <p className="mt-8 text-sm text-gray-400">
          By joining, you agree to our{' '}
          <span className="text-purple-300 hover:underline cursor-pointer">Terms of Service</span>{' '}
          and{' '}
          <span className="text-purple-300 hover:underline cursor-pointer">Privacy Policy</span>.
        </p>
      </div>
    </section>
  );
}

export default JoinForm;