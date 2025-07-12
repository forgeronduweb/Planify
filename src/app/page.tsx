'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const toggleBtn = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (toggleBtn && navMenu) {
      toggleBtn.addEventListener('click', () => {
        navMenu.classList.toggle('hidden');
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-sm text-[#18181b]">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-200 font-medium relative z-10 bg-white backdrop-blur-md">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold text-[#18181b] hover:text-black transition-colors">
        Planify
        </a>

        {/* Hamburger (Mobile) */}
        <button id="menu-toggle" className="md:hidden text-[#18181b] focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Nav Links */}
        <ul id="nav-menu" className="hidden max-md:absolute top-full left-0 max-md:w-full md:flex md:items-center gap-8 max-md:bg-white max-md:shadow-md max-md:px-6 max-md:py-4 flex-col md:flex-row z-50">
          <li><a className="hover:text-black md:hover:underline underline-offset-8 transition" href="/">Accueil</a></li>
          <li><a className="hover:text-black md:hover:underline underline-offset-8 transition" href="#about">À propos</a></li>
          <li><a className="hover:text-black md:hover:underline underline-offset-8 transition" href="#features">Fonctionnalités</a></li>
          <li><a className="hover:text-black md:hover:underline underline-offset-8 transition" href="#privacy">Confidentialité</a></li>
          <li><a className="hover:text-black md:hover:underline underline-offset-8 transition" href="#contact">Contact</a></li>

          {/* Login button for mobile */}
          <li className="block md:hidden mt-4">
            <button 
              onClick={() => router.push('/login')}
              className="group flex items-center gap-2 bg-[#18181b] text-white px-4 py-2 rounded-xl"
            >
              Connexion
              <svg className="group-hover:translate-x-1 transition pt-0.5" width="12" height="9" viewBox="0 0 12 9"
                fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 4.5h10.182m-4-3.5 4 3.5-4 3.5" stroke="#6B7280" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </li>
        </ul>

        {/* Login button for desktop */}
        <button 
          onClick={() => router.push('/login')}
          className="group hidden md:flex items-center gap-2 bg-[#18181b] text-white px-4 py-2 rounded-xl"
        >
          Connexion
          <svg className="group-hover:translate-x-1 transition pt-0.5" width="12" height="9" viewBox="0 0 12 9"
            fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 4.5h10.182m-4-3.5 4 3.5-4 3.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"
              strokeLinejoin="round" />
          </svg>
        </button>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center min-h-[calc(100vh-73px)]">
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6 border border-gray-200 rounded-2xl bg-white pl-4 p-1 text-sm text-[#18181b] max-w-full shadow">
          <p>Lancement de notre nouvelle plateforme de gestion de tâches.</p>
          <div className="flex items-center cursor-pointer gap-2 bg-white border border-gray-200 rounded-2xl px-3 py-1 whitespace-nowrap shadow">
            <p>Explorer</p>
            <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 4.5h10.182m-4-3.5 4 3.5-4 3.5" stroke="#6B7280" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold max-w-4xl text-[#18181b]">
          Gérez vos tâches efficacement
        </h1>
        <p className="max-w-xl text-center mt-6 px-4 text-[#18181b]">
          Simplifiez votre quotidien avec notre plateforme de gestion de tâches. Organisez, suivez et accomplissez vos objectifs en toute simplicité.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <button 
            onClick={() => router.push('/login')}
            className="px-7 py-3 rounded-xl bg-[#18181b] text-white font-medium hover:bg-black transition-colors"
          >
            Commencer maintenant
          </button>
          <button className="group px-7 py-2.5 flex items-center gap-2 font-medium bg-white text-[#18181b] border border-gray-200 rounded-xl shadow hover:bg-[#f3f4f6] transition-colors">
            En savoir plus
            <svg className="group-hover:translate-x-1 transition pt-0.5" width="12" height="9" viewBox="0 0 12 9"
              fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 4.5h10.182m-4-3.5 4 3.5-4 3.5" stroke="#6B7280" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
