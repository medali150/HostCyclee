import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/Appcontext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLogin, getUserData } = useContext(AppContent);
  const [state, setState] = useState('sign up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Contry, setContry] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
      if (state === 'sign up') {
        const { data } = await axios.post(`https://host-cycle-ji9x-jc6rrgn9k-aymens-projects-9ad69811.vercel.app/api/auth/register`, {
          name,
          email,
          password,
          Contry,
        });
        if (data.success) {
          setIsLogin(true);
          getUserData();
          navigate('/Home');
        } else {
          toast.error(data.message);
        }
      } else if (state === 'login') {
        const { data } = await axios.post(`https://host-cycle-ji9x-jc6rrgn9k-aymens-projects-9ad69811.vercel.app/api/auth/login`, {
          email,
          password,
        });
        if (data.success) {
          setIsLogin(true);
          getUserData();
          navigate('/Home');
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold">
              {state === 'sign up' ? 'Create Account' : 'Login'}
            </h1>
            <form onSubmit={onSubmitHandler} className="divide-y divide-gray-200 space-y-6">
              {state === 'sign up' && (
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-500"
                    placeholder="Username"
                  />
                  <label
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Username
                  </label>
                </div>
              )}
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-500"
                  placeholder="Email Address"
                />
                <label
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Email Address
                </label>
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-500"
                  placeholder="Password"
                />
                <label
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Password
                </label>
              </div>
              {state === 'sign up' && (
                <div className="relative">
                  <select
                    value={Contry}
                    onChange={(e) => setContry(e.target.value)}
                    className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="">Select Country</option>
                    <option value="Tunisia">Tunisia</option>
                    <option value="Morocco">Morocco</option>
                    <option value="Algeria">Algeria</option>
                    <option value="Egypt">Egypt</option>
                    <option value="Libya">Libya</option>
                  </select>
                </div>
              )}
              <div className="relative">
                <button type="submit" className="w-full bg-black text-white rounded-md px-4 py-2 hover:bg-gray-800">
                  {state === 'sign up' ? 'Sign Up' : 'Login'}
                </button>
              </div>
            </form>
            <div className="text-center mt-4">
              {state === 'sign up' ? (
                <p>
                  Already have an account?{' '}
                  <span
                    onClick={() => setState('login')}
                    className="text-cyan-500 cursor-pointer"
                  >
                    Login here
                  </span>
                </p>
              ) : (
                <p>
                  Don't have an account?{' '}
                  <span
                    onClick={() => setState('sign up')}
                    className="text-cyan-500 cursor-pointer"
                  >
                    Sign up here
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
