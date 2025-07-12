import React, { useState, useEffect } from 'react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, ClockIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

const HOURS = [
  '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00',
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00',
  '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00',
];

type Task = {
  id: number;
  title: string;
  description: string | null;
  status: string;
  priority: string | null;
  category: string;
  createdAt: string;
  completedAt: string | null;
  userId: string;
};
type TaskModalProps = {
  open: boolean;
  onClose: () => void;
  onTaskCreated?: () => void;
  editTask?: Task | null;
  setEditTask?: (task: Task | null) => void;
};

export default function TaskModal({ open, onClose, onTaskCreated, editTask, setEditTask }: TaskModalProps) {
  // TOUS les hooks ici, AVANT tout return ou condition
  const [title, setTitle] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [date, setDate] = useState(new Date());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [startHour, setStartHour] = useState('09:00');
  const [endHour, setEndHour] = useState('14:00');
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [showListDropdown, setShowListDropdown] = useState(false);
  const [selectedList, setSelectedList] = useState('');
  const [view, setView] = useState<'calendar' | 'notes'>('calendar');
  const [notes, setNotes] = useState('');
  const [notesPriority, setNotesPriority] = useState("");
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const priorities = [
    { label: 'Importante', color: 'text-red-600', bg: 'bg-red-50', value: 'IMPORTANTE' },
    { label: 'Moyenne', color: 'text-yellow-600', bg: 'bg-yellow-50', value: 'MOYENNE' },
    { label: 'Mineur', color: 'text-blue-600', bg: 'bg-blue-50', value: 'PAS_IMPORTANTE' },
  ];
  const categories = [
    { label: 'Personnel', value: 'PERSONAL', icon: '👤' },
    { label: 'Travail', value: 'WORK', icon: '💼' },
    { label: 'Santé', value: 'HEALTH', icon: '🏥' },
    { label: 'Éducation', value: 'EDUCATION', icon: '📚' },
    { label: 'Finance', value: 'FINANCE', icon: '💰' },
    { label: 'Voyage', value: 'TRAVEL', icon: '✈️' },
    { label: 'Shopping', value: 'SHOPPING', icon: '🛍️' },
    { label: 'Autre', value: 'OTHER', icon: '📝' },
  ];

  useEffect(() => {
    if (open) {
      setView('calendar');
      setShowCalendar(true);
      setShowTime(false);
    }
  }, [open]);

  // Pré-remplir le formulaire si editTask change
  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setNotes(editTask.description || '');
      setSelectedCategory(editTask.category);
      setNotesPriority(priorities.find(p => p.value === editTask.priority)?.label || '');
      setView('notes');
    }
  }, [editTask]);

  // Fonction pour créer une tâche
  const handleSaveTask = async () => {
    if (!title.trim()) {
      alert('Veuillez saisir un titre pour la tâche');
      return;
    }

    if (!selectedCategory) {
      alert('Veuillez sélectionner une catégorie');
      return;
    }

    try {
      // Trouver la priorité correspondante
      const selectedPriority = priorities.find(p => p.label === notesPriority);
      const taskData = {
        title: title.trim(),
        description: notes.trim(),
        priority: selectedPriority?.value || null,
        category: selectedCategory,
      };

      if (editTask) {
        // PATCH (édition)
        await axios.patch(`/api/tasks/${editTask.id}`, taskData);
        if (setEditTask) setEditTask(null);
      } else {
        // POST (création)
        await axios.post('/api/tasks', taskData);
      }
      // Réinitialiser le formulaire
      setTitle('');
      setNotes('');
      setNotesPriority('');
      setSelectedCategory('');
      setDate(new Date());
      setStartHour('09:00');
      setEndHour('14:00');
      setSelectedList('');
      // Fermer la modale
      onClose();
      // Rafraîchir la liste des tâches
      if (onTaskCreated) {
        onTaskCreated();
      }
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de la tâche:', error);
      alert('Erreur lors de l\'enregistrement de la tâche');
    }
  };

  useEffect(() => {
    if (view === 'calendar') {
      setShowCalendar(true);
    }
  }, [view]);

  if (!open) return null;

  // Définition des classes conditionnelles pour les boutons calendar/notes
  const calendarBtnClass = `w-10 h-10 flex items-center justify-center rounded-xl border ${view === 'calendar' ? 'bg-black border-black' : 'bg-white border-gray-300'}`;
  const notesBtnClass = `w-10 h-10 flex items-center justify-center rounded-xl border ${view === 'notes' ? 'bg-black border-black' : 'bg-white border-gray-300'}`;
  const calendarIconClass = `w-6 h-6 ${view === 'calendar' ? 'text-white' : 'text-gray-700'}`;
  const notesIconClass = `w-6 h-6 ${view === 'notes' ? 'text-white' : 'text-gray-700'}`;

  // Générer un calendrier simple (mois sélectionné)
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className={`bg-white rounded-2xl shadow-2xl p-4 flex flex-col relative transition-all duration-300 ${view === 'notes' ? 'w-[420px] min-h-[320px]' : 'w-[420px] min-h-[540px]'}`}>
        {/* Ligne date + icônes : affichée uniquement si view !== 'notes' */}
        {view !== 'notes' && (
          <div className="flex items-center justify-between rounded-full px-2 py-1 mb-3 w-full shadow-sm">
            {/* Date + flèches à gauche */}
            <div className="flex items-center">
              <button
                onClick={() => {
                  if (month === 0) { setMonth(11); setYear(y => y - 1); }
                  else setMonth(m => m - 1);
                }}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow text-gray-400 hover:text-blue-500 transition"
                aria-label="Mois précédent"
                type="button"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <div className="flex items-center gap-2 text-blue-600 font-semibold text-base select-none ml-2">
                <CalendarIcon className="w-5 h-5" />
                <span>{monthNames[month]}, {year}</span>
              </div>
              <button
                onClick={() => {
                  if (month === 11) { setMonth(0); setYear(y => y + 1); }
                  else setMonth(m => m + 1);
                }}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow text-gray-400 hover:text-blue-500 transition ml-2"
                aria-label="Mois suivant"
                type="button"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
            {/* Icônes calendar/notes à droite */}
            <div className="flex items-center gap-2">
              <button
                className={calendarBtnClass}
                onClick={() => { setView('calendar'); setShowCalendar(true); setShowTime(false); }}
                title="Vue calendrier"
                type="button"
              >
                <CalendarIcon className={calendarIconClass} />
              </button>
              <button
                className={notesBtnClass}
                onClick={() => setView('notes')}
                title="Vue notes"
                type="button"
              >
                <ClipboardIcon className={notesIconClass} />
              </button>
            </div>
          </div>
        )}
        {/* Affichage conditionnel des vues */}
        {view === 'calendar' && (
          <>
            {/* Calendrier */}
            {showCalendar && !showTime && (
              <div className="bg-gray-50 rounded-xl p-6 mb-4 w-full">
                {/* On retire ici le select d'année, il est déjà dans la barre du haut */}
                <div className="grid grid-cols-7 gap-3 text-center text-gray-500 text-sm mb-4 w-full">
                    {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => <span key={d}>{d}</span>)}
                  </div>
                  <div className="grid grid-cols-7 gap-3 text-center w-full mb-2">
                    {Array.from({ length: firstDay }).map((_, i) => <span key={i}></span>)}
                    {days.map(day => (
                      <button
                        key={day}
                        className={`w-full h-10 rounded-full flex items-center justify-center text-sm ${day === date.getDate() && month === date.getMonth() && year === date.getFullYear() ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'}`}
                        onClick={() => { setDate(new Date(year, month, day)); }}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
            )}
            {/* Grille d'heures (Set time) */}
            {showTime && (
              <>
                {/* Affichage des heures sélectionnées en bulles arrondies bleu clair, large, centré */}
                <div className="flex items-center justify-center gap-2 w-full mb-2 mt-1">
                  <div className="w-[150px]">
                    <div className="bg-blue-50 rounded-full px-3 py-1 w-full flex items-center justify-center">
                      <span className="text-blue-600 text-base font-semibold">{startHour || '\u00A0'}</span>
                    </div>
                  </div>
                  <span className="text-gray-400 text-lg font-bold mx-1">-</span>
                  <div className="w-[150px]">
                    <div className="bg-blue-50 rounded-full px-3 py-1 w-full flex items-center justify-center">
                      <span className="text-blue-600 text-base font-semibold">{endHour || '\u00A0'}</span>
                    </div>
                  </div>
                </div>
                {/* Grille d'heures unique en 6 lignes de 4 colonnes, sélectionne la même heure pour début et fin */}
                <div className="flex flex-col items-center mb-2 w-full">
                  <div className="grid grid-cols-4 gap-1 w-full mb-1">
                    {Array.from({ length: 6 }).map((_, row) => (
                      [0, 1, 2, 3].map(col => {
                        const idx = row + col * 6;
                        const h = HOURS[idx];
                        return (
                          <button
                            key={h + '-unique'}
                            className={`w-full py-1 rounded-full text-sm font-semibold transition-all
                              ${startHour === h ? 'bg-blue-500 text-white' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
                            onClick={() => {
                              setStartHour(h);
                              // Calculer l'index de fin (max 23)
                              let endIdx = idx + 3;
                              if (endIdx > 23) endIdx = 23;
                              setEndHour(HOURS[endIdx]);
                            }}
                          >
                            {h}
                          </button>
                        );
                      })
                    ))}
                  </div>
                  {/* Custom hours compact, sans titre, marge réduite */}
                  <div className="mt-1 flex gap-1 w-full">
                    <div className="flex-1 bg-gray-100 rounded-lg px-2 py-1 flex items-center">
                      <input
                        id="custom-from"
                        type="text"
                        className="w-full bg-transparent border-none text-center text-sm font-medium focus:outline-none"
                        value={startHour}
                        onChange={e => setStartHour(e.target.value)}
                        placeholder="Custom Hours (from)"
                      />
                    </div>
                    <div className="flex-1 bg-gray-100 rounded-lg px-2 py-1 flex items-center">
                      <input
                        id="custom-until"
                        type="text"
                        className="w-full bg-transparent border-none text-center text-sm font-medium focus:outline-none"
                        value={endHour}
                        onChange={e => setEndHour(e.target.value)}
                        placeholder="Custom Hours (until)"
                      />
                    </div>
                  </div>
                </div>
                {/* Marge avant le bouton Set date */}
                <div className="mt-1" />
              </>
            )}
            {/* Bouton Set time/Set date */}
            <div className="mb-2">
              <button
                className="w-full flex items-center justify-center gap-2 bg-blue-100 text-blue-700 font-semibold h-11 rounded-full text-sm transition-all border-none hover:bg-blue-200"
                onClick={() => { 
                  if (showTime) {
                    setShowTime(false);
                    setShowCalendar(true);
                  } else {
                    setShowTime(true);
                    setShowCalendar(false);
                  }
                }}
                type="button"
              >
                {showTime ? (
                  <>
                    <CalendarIcon className="w-5 h-5" />
                    <span>Set date</span>
                  </>
                ) : (
                  <>
                    <ClockIcon className="w-5 h-5" />
                    <span>Set time</span>
                  </>
                )}
              </button>
            </div>
          </>
        )}
        {view === 'notes' && (
          <div className="flex flex-col flex-1 mb-4 gap-4">
            {/* Ligne titre + icônes à droite */}
            <div className="flex items-center justify-between w-full max-w-full">
              <div className="flex flex-col items-start max-w-[220px] w-full">
                <input
                  id="task-title"
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200 w-full text-left"
                  placeholder="Titre de la tâche"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button
                  className={calendarBtnClass}
                  onClick={() => { setView('calendar'); setShowCalendar(true); setShowTime(false); }}
                  title="Vue calendrier"
                  type="button"
                >
                  <CalendarIcon className={calendarIconClass} />
                </button>
                <button
                  className={notesBtnClass}
                  onClick={() => setView('notes')}
                  title="Vue notes"
                  type="button"
                >
                  <ClipboardIcon className={notesIconClass} />
                </button>
              </div>
            </div>
            {/* Menu déroulant catégorie */}
            <div>
              <div className="relative">
                <button
                  onClick={() => setShowListDropdown(!showListDropdown)}
                  className={`w-full border border-gray-200 rounded-2xl px-4 py-2 text-sm bg-white text-left hover:border-blue-400 transition-all flex items-center justify-between shadow focus:ring-2 focus:ring-blue-200 group ${showListDropdown ? 'border-blue-500 ring-2 ring-blue-100' : ''}`}
                  style={{ minHeight: 40 }}
                >
                  <span className={selectedCategory ? 'text-gray-800 font-semibold' : 'text-gray-400'}>
                    {selectedCategory ? categories.find(c => c.value === selectedCategory)?.label || '' : 'Sélectionner une catégorie'}
                  </span>
                  <svg className={`w-6 h-6 ml-2 text-gray-400 transition-transform duration-200 ${showListDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                {showListDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-3 bg-white border border-gray-100 rounded-2xl shadow-2xl z-30 py-1 flex flex-col gap-1 animate-fade-in">
                    {categories.map(category => (
                      <button
                        key={category.value}
                        onClick={() => {
                          setSelectedCategory(category.value);
                          setShowListDropdown(false);
                        }}
                        className={`w-full px-3 py-1 text-left text-sm rounded-lg flex items-center gap-1 transition-all duration-150
                          ${category.value === selectedCategory ? 'bg-blue-500 text-white font-bold shadow' : 'text-gray-800 hover:bg-blue-50'}
                          focus:outline-none focus:ring-2 focus:ring-blue-200
                        `}
                        style={{ minHeight: 28 }}
                      >
                        <span className="text-base">{category.icon}</span>
                        <span className="text-xs">{category.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {/* Zone de notes */}
            <div className="flex flex-col flex-1">
              <textarea
                id="notes"
                className="flex-1 min-h-[120px] max-h-[220px] bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none"
                placeholder="Ajouter des notes à la tâche"
                value={notes}
                onChange={e => setNotes(e.target.value)}
              />
            </div>
          </div>
        )}
        {/* Bouton Add to priority uniquement en vue notes */}
        {view === 'notes' && (
          <div className="relative w-full mb-1">
            <button
              type="button"
              onClick={() => setShowPriorityDropdown(v => !v)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white text-left hover:border-gray-300 transition-colors flex items-center justify-between"
            >
              <span className={notesPriority ? `font-semibold ${priorities.find(p => p.label === notesPriority)?.color}` : 'text-gray-400'}>
                {notesPriority || 'Ajouter une priorité'}
              </span>
              <span className="text-gray-400">▼</span>
            </button>
            {showPriorityDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                {priorities.map(p => (
                  <button
                    key={p.label}
                    onClick={() => { setNotesPriority(p.label); setShowPriorityDropdown(false); }}
                    className={`w-full px-3 py-2 text-left text-base hover:bg-blue-50 transition-colors flex items-center ${notesPriority === p.label ? `${p.bg} ${p.color} font-semibold` : 'text-gray-700'}`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        {/* Boutons bas de modale selon la vue */}
        {view === 'notes' ? (
          <div className="flex gap-2 mt-4">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold h-12 rounded-full text-sm transition-all border border-gray-300"
              type="button"
            >
              Cancel
            </button>
            <button 
              onClick={handleSaveTask}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold h-12 rounded-full text-sm transition-all"
              type="button"
            >
              {editTask ? 'Apply changes' : 'Create task'}
            </button>
          </div>
        ) : (
          <div className="mt-2">
            <button
              onClick={onClose}
              className="w-full h-11 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-full text-sm transition-all border border-gray-300 text-center"
              type="button"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 