'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    setMessage(data.message || data.error);
  };

  return (
    <div className="p-4 max-w-md mx-auto font-sans relative">
      <Link href="/dashboard" className="absolute top-6 left-6 text-2xl font-bold text-black hover:underline">
        Planify
      </Link>
      <h1 className="text-2xl font-bold mb-4">Inscription</h1>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full border p-2"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">S'inscrire</button>
      </form>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}
