import React from 'react';

// Catégories disponibles
const categories = [
  { name: 'Toutes', icon: '🏠', value: null },
  { name: 'Personnel', icon: '👤', value: 'PERSONAL' },
  { name: 'Travail', icon: '💼', value: 'WORK' },
  { name: 'Santé', icon: '🏥', value: 'HEALTH' },
  { name: 'Éducation', icon: '📚', value: 'EDUCATION' },
  { name: 'Finance', icon: '💰', value: 'FINANCE' },
  { name: 'Voyage', icon: '✈️', value: 'TRAVEL' },
  { name: 'Shopping', icon: '🛍️', value: 'SHOPPING' },
  { name: 'Autre', icon: '📝', value: 'OTHER' },
];

export default function Sidebar({ 
  showTitle = true, 
  onCategoryFilter, 
  selectedCategory,
  taskCounts,
  onLogout
}: { 
  showTitle?: boolean;
  onCategoryFilter?: (category: string | null) => void;
  selectedCategory?: string | null;
  taskCounts?: Record<string, number>;
  onLogout?: () => void;
}) {
  return (
    <aside className="bg-white flex flex-col justify-between w-[368px] min-w-[368px] px-[24px] py-[24px] border-r border-gray-100 rounded-xl h-auto mt-[5px] mb-[5px] shadow">
      <div>
        {showTitle && (
          <h2 className="text-2xl font-bold text-black mt-[24px] mb-[16px]">Catégorie</h2>
        )}
        <ul className="mb-[16px]">
          {categories.map((category) => (
            <li key={category.value}>
              <button
                className={`w-full flex items-center justify-between h-[36px] px-3 rounded-[10px] mb-[2px] transition-all focus:outline-none active:scale-95 hover:bg-gray-50 cursor-pointer ${
                  (selectedCategory === category.value) || (selectedCategory === null && category.value === null)
                    ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                    : 'text-gray-700'
                }`}
                type="button"
                onClick={() => onCategoryFilter?.(category.value)}
              >
                <span className="flex items-center gap-2">
                  <span className="text-base">{category.icon}</span>
                  <span className="text-sm">{category.name}</span>
                </span>
                <span className="text-xs bg-gray-200 rounded-full px-2 py-0.5 font-semibold text-gray-700 min-w-[20px] text-center">
                  {category.value === null ? Object.values(taskCounts || {}).reduce((sum, count) => sum + count, 0) : taskCounts?.[category.value] || 0}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <button className="flex items-center justify-between w-full h-[36px] px-3 rounded-[10px] bg-gray-100 hover:bg-gray-200 text-black font-semibold text-sm transition-all mb-[16px]">
          <span className="flex items-center gap-2">
            <span className="text-base">＋</span>
            Create new list
          </span>
          <span className="bg-white border border-gray-300 rounded px-2 py-0.5 text-xs font-semibold">⌘ N</span>
        </button>
        <h2 className="text-xl font-bold text-black mt-[24px] mb-[12px]">Group</h2>
        <div className="flex gap-2 mb-[12px]">
          <div className="bg-gray-100 rounded-lg p-2 flex flex-col items-center w-1/2">
            <div className="flex -space-x-1 mb-1">
              <span className="w-6 h-6 rounded-full bg-yellow-300 flex items-center justify-center text-white font-bold text-xs border-2 border-white">A</span>
              <span className="w-6 h-6 rounded-full bg-pink-400 flex items-center justify-center text-white font-bold text-xs border-2 border-white">B</span>
              <span className="w-6 h-6 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold text-xs border-2 border-white">C</span>
              <span className="w-6 h-6 rounded-full bg-green-400 flex items-center justify-center text-white font-bold text-xs border-2 border-white">D</span>
            </div>
            <span className="text-xs font-semibold text-gray-700">Mobal Project</span>
            <span className="text-[9px] text-gray-400">5 People</span>
          </div>
          <div className="bg-gray-100 rounded-lg p-2 flex flex-col items-center w-1/2">
            <div className="flex -space-x-1 mb-1">
              <span className="w-6 h-6 rounded-full bg-purple-400 flex items-center justify-center text-white font-bold text-xs border-2 border-white">E</span>
              <span className="w-6 h-6 rounded-full bg-orange-400 flex items-center justify-center text-white font-bold text-xs border-2 border-white">F</span>
              <span className="w-6 h-6 rounded-full bg-blue-300 flex items-center justify-center text-white font-bold text-xs border-2 border-white">G</span>
              <span className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold text-xs border-2 border-white">H</span>
            </div>
            <span className="text-xs font-semibold text-gray-700">Futur Project</span>
            <span className="text-[9px] text-gray-400">4 People</span>
          </div>
        </div>
        <button className="flex items-center justify-between w-full h-[36px] px-3 rounded-[10px] bg-gray-100 hover:bg-gray-200 text-black font-semibold text-sm transition-all">
          <span className="flex items-center gap-2">
            <span className="text-base">＋</span>
            Create new group
          </span>
          <span className="bg-white border border-gray-300 rounded px-2 py-0.5 text-xs font-semibold">⌘ G</span>
        </button>
      </div>
      {/* Bouton de déconnexion en bas */}
      <div className="mt-auto pt-3 border-t border-gray-200">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 h-[36px] px-3 rounded-[10px] bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-sm transition-all"
        >
          <span className="text-base">🚪</span>
          Se déconnecter
        </button>
      </div>
    </aside>
  );
} 