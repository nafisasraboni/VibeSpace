import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authUser';

const SignUpPage = () => {
  const { searchParams } = new URL(window.location.href);
  const emailValue = searchParams.get("email");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: emailValue || "",
    username: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const { signup, isSigningUp } = useAuthStore();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    // Clear error when user types
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      const result = await signup(formData);
      if (result?.success) {
        // Redirect to login or dashboard after successful signup
        navigate('/login');
      }
    } catch (error) {
      // Error handling is already done in the store
      console.error("Signup error:", error);
    }
  };

  return (
    <div className='h-screen w-full hero-bg'>
      <header className='max-w-6xl mx-auto flex items-center justify-between p-4'>
        <Link to="/">
          <img src='/VibeSpace-logo.png' alt='VibeSpace logo' className='w-24 md:w-40' />
        </Link>
      </header>
       
      <div className='flex justify-center items-center mt-20 mx-3'>
        <div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md'>
          <h1 className='text-center text-white text-2xl font-bold mb-4'>Sign Up</h1>

          <form className='space-y-4' onSubmit={handleSignUp}>
            <div>
              <label htmlFor='email' className='text-sm font-medium text-gray-300 block'>
                Email:
              </label>
              <input
                type='email'
                id='email'
                className={`w-full px-3 py-2 mt-1 border rounded-md bg-transparent text-white focus:outline-none focus:ring ${
                  errors.email ? 'border-red-500' : 'border-gray-700'
                }`}
                placeholder='you@example.com'
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor='username' className='text-sm font-medium text-gray-300 block'>
                Username:
              </label>
              <input
                type='text'
                id='username'
                className={`w-full px-3 py-2 mt-1 border rounded-md bg-transparent text-white focus:outline-none focus:ring ${
                  errors.username ? 'border-red-500' : 'border-gray-700'
                }`}
                placeholder='nafisa_sraboni'
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-500">{errors.username}</p>
              )}
            </div>

            <div>
              <label htmlFor='password' className='text-sm font-medium text-gray-300 block'>
                Password:
              </label>
              <input
                type='password'
                id='password'
                className={`w-full px-3 py-2 mt-1 border rounded-md bg-transparent text-white focus:outline-none focus:ring ${
                  errors.password ? 'border-red-500' : 'border-gray-700'
                }`}
                placeholder='************'
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <button 
              type="submit"
              disabled={isSigningUp}
              className={`w-full py-2 text-white font-semibold rounded-md ${
                isSigningUp ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {isSigningUp ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
          
          <div className='text-center text-gray-400'>
            Already a member?{" "}
            <Link to="/login" className='text-red-500 hover:underline'>Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;