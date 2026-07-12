import React, { useState } from 'react';
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input, Logo } from './index';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { ArrowLeft } from 'lucide-react';

function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const currentUser = await authService.getCurrentUser();
        dispatch(login(currentUser));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-cream text-ink flex flex-col justify-center py-12 px-6 lg:px-8">
      {/* Back Button */}
      <div className="absolute top-6 left-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-ink-light hover:text-ink transition-colors font-inter text-sm font-medium group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-4">
          <Logo width="80px" />
        </div>
        <h2 className="text-center font-archivo text-3xl font-bold tracking-tight text-ink">
          Sign up to create an account
        </h2>
        <p className="mt-2 text-center text-sm font-inter text-ink-light">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-accent hover:underline transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-cream-dark/30 border border-ink/5 p-8 rounded-3xl shadow-xl backdrop-blur-sm">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-accent/10 border border-accent/20 text-accent text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(create)} className="space-y-6">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              className="w-full px-4 py-3 rounded-xl bg-cream border border-ink/10 focus:border-accent focus:outline-none transition-colors"
              {...register("name", { required: true })}
            />

            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              className="w-full px-4 py-3 rounded-xl bg-cream border border-ink/10 focus:border-accent focus:outline-none transition-colors"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl bg-cream border border-ink/10 focus:border-accent focus:outline-none transition-colors"
              {...register("password", {
                required: true,
                matchPattern: (value) =>
                  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(value) ||
                  "Enter a valid password",
              })}
            />

            <div>
              <Button
                type="submit"
                className="w-full py-3.5 bg-ink text-cream hover:bg-accent hover:text-white rounded-full font-inter font-semibold transition-all duration-300 hover:scale-105"
              >
                Create Account
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;