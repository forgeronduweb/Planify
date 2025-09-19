'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// Configuration d'axios pour inclure les cookies
axios.defaults.withCredentials = true;

export default function AuthForm() {
  const [state, setState] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const endpoint = state === 'login' ? '/api/auth/login' : '/api/auth/register';
    const payload = state === 'register' ? { name, email, password } : { email, password };

    try {
      const res = await axios.post(endpoint, payload);

      if (res.status === 200) {
        setMessage('');
        router.push('/dashboard'); // Redirige vers le dashboard
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.message || error.response?.data?.error || 'Une erreur est survenue.');
      } else {
        setMessage('Une erreur est survenue.');
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl bg-white text-gray-900"
    >
      {/* Form Title */}
      <p className="text-2xl font-medium m-auto text-black">
         {state === 'login' ? 'Login' : 'Sign Up'}
      </p>

      {state === 'register' && (
        <div className="w-full">
          <p className="text-gray-700">Name</p>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="type here"
            className="border border-gray-300 rounded w-full p-2 mt-1 outline-gray-700 text-gray-900 bg-white"
            type="text"
            required
          />
        </div>
      )}

      <div className="w-full">
        <p className="text-gray-700">Email</p>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="type here"
          className="border border-gray-300 rounded w-full p-2 mt-1 outline-gray-700 text-gray-900 bg-white"
          type="email"
          required
        />
      </div>

      <div className="w-full">
        <p className="text-gray-700">Password</p>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="type here"
          className="border border-gray-300 rounded w-full p-2 mt-1 outline-gray-700 text-gray-900 bg-white"
          type="password"
          required
        />
      </div>

      {message && <p className="text-red-500 text-sm">{message}</p>}

      {state === 'register' ? (
        <p className="text-gray-600">
          Already have account?{' '}
          <span onClick={() => setState('login')} className="text-black cursor-pointer hover:underline">
            click here
          </span>
        </p>
      ) : (
        <p className="text-gray-600">
          Create an account?{' '}
          <span onClick={() => setState('register')} className="text-black cursor-pointer hover:underline">
            click here
          </span>
        </p>
      )}

      <button
        type="submit"
        className="bg-black hover:bg-gray-800 transition-all text-white w-full py-2 rounded-md cursor-pointer"
      >
        {state === 'register' ? 'Create Account' : 'Login'}
      </button>
    </form>
  );
}
