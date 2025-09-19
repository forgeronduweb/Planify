import React, { useState } from 'react';

export type NewListModalProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string, emoji?: string) => void;
};

export default function NewListModal({ open, onClose, onCreate }: NewListModalProps) {
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('');

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col w-[350px] min-h-[220px] relative">
        <h2 className="text-2xl font-bold mb-7 text-center">Créer une nouvelle liste</h2>
        <div className="flex flex-col gap-4 mb-6">
          <input
            className="border border-gray-200 rounded-2xl px-4 py-3 text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full placeholder-gray-400 transition-all"
            placeholder="Nom de la liste"
            value={name}
            onChange={e => setName(e.target.value)}
            autoFocus
          />
          <input
            className="border border-gray-200 rounded-2xl px-4 py-3 text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full placeholder-gray-400 transition-all"
            placeholder="Emoji (optionnel)"
            value={emoji}
            onChange={e => setEmoji(e.target.value)}
            maxLength={2}
          />
        </div>
        <div className="flex gap-4 mt-2">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold h-12 rounded-full text-base border border-gray-200 transition-all"
            type="button"
          >
            Annuler
          </button>
          <button
            onClick={() => { if (name.trim()) { onCreate(name.trim(), emoji.trim()); setName(''); setEmoji(''); } }}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold h-12 rounded-full text-base transition-all"
            type="button"
            disabled={!name.trim()}
          >
            Créer
          </button>
        </div>
      </div>
    </div>
  );
} 