// src/app/login/page.tsx
import LoginForm from './LoginForm';
// Removed Link import as it's no longer used
// import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-900 font-sans relative">
       {/* Site Title/Logo in top left with padding - REMOVED */}
      {/* <Link href="/dashboard" className="absolute top-6 left-6 text-2xl font-bold text-black hover:underline">
        Planify
      </Link> */}
      <LoginForm />
    </div>
  );
}
