import { useState } from 'react';

interface FilterDropdownProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  className?: string;
}

export default function FilterDropdown({ value, options, onChange, className = '' }: FilterDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`relative w-[160px] ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="flex items-center justify-between w-[160px] h-[48px] px-4 border border-gray-200 rounded-[8px] bg-white text-gray-700 font-semibold text-base shadow-sm hover:bg-gray-50 transition-all"
      >
        <span>{value}</span>
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block ml-2">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-[8px] shadow-lg z-10 py-1">
          {options.map(opt => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`w-full text-left px-4 py-2 text-base hover:bg-blue-50 transition rounded-[6px] ${opt === value ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-900'}`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 