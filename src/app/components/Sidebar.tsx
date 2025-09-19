import React from 'react';

export default function Sidebar({
  selectedCategory,
  onSelectCategory,
  onLogout,
}: {
  selectedCategory: string | null;
  onSelectCategory: (category: string) => void;
  onLogout: () => void;
}) {
  const groups = [
    { id: 'today', name: 'Today', emoji: '📅', count: 3 },
    { id: 'upcoming', name: 'Upcoming', emoji: '⏰', count: 8 },
    { id: 'completed', name: 'Completed', emoji: '✅', count: 12 },
  ];

  const categories = [
    { id: 'PERSONAL', name: 'Personnel', emoji: '👤', count: 4 },
    { id: 'WORK', name: 'Travail', emoji: '💼', count: 6 },
    { id: 'HEALTH', name: 'Santé', emoji: '🏥', count: 3 },
    { id: 'EDUCATION', name: 'Éducation', emoji: '📚', count: 8 },
    { id: 'FINANCE', name: 'Finance', emoji: '💰', count: 5 },
    { id: 'TRAVEL', name: 'Voyage', emoji: '✈️', count: 2 },
    { id: 'SHOPPING', name: 'Shopping', emoji: '🛍️', count: 7 },
    { id: 'OTHER', name: 'Autre', emoji: '📝', count: 1 },
  ];

  return (
    <aside className="bg-white flex flex-col justify-between w-[340px] min-w-[340px] px-4 py-4 border-r border-gray-100 rounded-2xl h-auto mt-2 mb-2 shadow">
      <div className="flex-1">
        {/* Groupe Today, Upcoming, Completed */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Groups</h2>
          <ul className="space-y-2">
            {groups.map(group => (
              <li key={group.id}>
                <button
                  className={`w-full flex items-center justify-between h-[40px] px-3 rounded-xl transition-all focus:outline-none hover:bg-gray-50 cursor-pointer ${
                    selectedCategory === group.id ? 'bg-blue-100 text-blue-700 border border-blue-200' : 'text-gray-700'
                  }`}
                  type="button"
                  onClick={() => onSelectCategory(group.id)}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base">{group.emoji}</span>
                    <span className="text-sm font-medium">{group.name}</span>
                  </span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {group.count}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Catégories */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Categories</h2>
          <ul className="space-y-2">
            {categories.map(category => (
              <li key={category.id}>
                <button
                  className={`w-full flex items-center justify-between h-[40px] px-3 rounded-xl transition-all focus:outline-none hover:bg-gray-50 cursor-pointer ${
                    selectedCategory === category.id ? 'bg-blue-100 text-blue-700 border border-blue-200' : 'text-gray-700'
                  }`}
                  type="button"
                  onClick={() => onSelectCategory(category.id)}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base">{category.emoji}</span>
                    <span className="text-sm font-medium">{category.name}</span>
                  </span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Boutons en bas */}
      <div className="space-y-2">
        <button
          className="flex items-center justify-between w-full h-[40px] px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-black font-semibold text-sm transition-all cursor-pointer"
          type="button"
        >
          <span className="flex items-center gap-2">
            <span className="text-base">＋</span>
            Create new list
          </span>
        </button>
        
        <button
          onClick={onLogout}
          className="flex items-center justify-between w-full h-[40px] px-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-sm transition-all cursor-pointer"
          type="button"
        >
          <span className="flex items-center gap-2">
            <span className="text-base">🚪</span>
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
} 