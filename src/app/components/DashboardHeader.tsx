import React, { useState, useRef, useEffect } from 'react';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
}

function getDateString() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

const PRIORITY_OPTIONS = ['Toutes', 'Importante', 'Moyenne', 'Mineur'];

export default function DashboardHeader({ userName = 'Sullivan', onPriorityChange }: { userName?: string, onPriorityChange?: (priority: string) => void }) {
  const [selected, setSelected] = useState('Toutes');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  useEffect(() => {
    if (onPriorityChange) onPriorityChange(selected);
  }, [selected, onPriorityChange]);

  return (
    <div className="flex items-center justify-between w-full h-[48px]">
      {/* Partie gauche : message et date */}
      <div className="flex flex-col justify-center">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          {getGreeting()}, <span className="text-black">{userName}!</span> <span className="text-xl">👋</span>
        </h1>
        <p className="text-gray-500 text-sm mt-1">{selected}, {getDateString()}</p>
      </div>
      {/* Partie droite : Priorité + menu hamburger */}
      <div className="flex items-center gap-[32px]" ref={ref}>
        <div className="relative">
          <button
            type="button"
            className="flex items-center justify-between w-[160px] h-[48px] px-4 border border-gray-200 rounded-[8px] bg-white text-gray-700 font-semibold text-base shadow-sm hover:bg-gray-50 transition-all"
            onClick={() => setOpen(v => !v)}
          >
            <span>{selected}</span>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block ml-2">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {open && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-[8px] shadow-lg z-10 py-1">
              {PRIORITY_OPTIONS.map(opt => (
                <button
                  key={opt}
                  onClick={() => { setSelected(opt); setOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-base hover:bg-blue-50 transition rounded-[6px] ${opt === selected ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-900'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
        <button className="w-[48px] h-[48px] flex items-center justify-center rounded-[8px] bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-all">
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      </div>
    </div>
  );
} 