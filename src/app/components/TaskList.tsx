import { ClockIcon, EllipsisVerticalIcon, PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskModal from './TaskModal';

// Type pour les tâches de la base de données
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

// Modale de confirmation suppression
function ConfirmDeleteModal({ open, onClose, onConfirm }: { open: boolean; onClose: () => void; onConfirm: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 flex flex-col items-center w-[340px]">
        <div className="text-red-500 text-4xl mb-2">🗑️</div>
        <div className="text-lg font-semibold mb-2 text-center">Supprimer la tâche ?</div>
        <div className="text-gray-500 text-sm mb-6 text-center">Cette action est irréversible.</div>
        <div className="flex gap-2 w-full">
          <button onClick={onClose} className="flex-1 h-11 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm border border-gray-300">Annuler</button>
          <button onClick={onConfirm} className="flex-1 h-11 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold text-sm">Oui, supprimer</button>
        </div>
      </div>
    </div>
  );
}

export default function TaskList({ 
  categoryFilter, 
  onTaskCreated 
}: { 
  categoryFilter?: string | null;
  onTaskCreated?: () => void;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [deleteTaskId, setDeleteTaskId] = useState<number | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Fonction pour récupérer les tâches depuis la base de données
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour basculer le statut d'une tâche
  const handleToggleStatus = async (task: Task) => {
    try {
      const newStatus = task.status === 'accomplie' ? 'non accomplie' : 'accomplie';
      await axios.patch(`/api/tasks/${task.id}`, { status: newStatus });
      fetchTasks(); // Rafraîchir la liste
      if (onTaskCreated) {
        onTaskCreated(); // Rafraîchir les compteurs dans le dashboard
      }
    } catch (error) {
      console.error('Erreur lors de la modification du statut:', error);
    }
  };

  // Fonction pour supprimer une tâche
  const handleDeleteTask = async (taskId: number) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      fetchTasks(); // Rafraîchir la liste
      if (onTaskCreated) {
        onTaskCreated(); // Rafraîchir les compteurs dans le dashboard
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  // Récupérer les tâches au montage du composant
  useEffect(() => {
    fetchTasks();
  }, []);

  // Filtrer les tâches selon la catégorie sélectionnée
  const filteredTasks = categoryFilter 
    ? tasks.filter(task => task.category === categoryFilter)
    : tasks;

  // Fermer le menu contextuel si on clique ailleurs
  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.relative')) {
        setOpenMenuId(null);
      }
    };
    if (openMenuId !== null) {
      document.addEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [openMenuId]);

  return (
    <div className="w-full flex flex-col items-center relative min-h-[600px]">
      {/* Liste centrale */}
      <div className="w-[888px] mx-auto flex flex-col gap-2 pt-4 pb-[120px] mt-[48px]">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-500">Chargement des tâches...</div>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-500">
              {categoryFilter ? `Aucune tâche trouvée dans cette catégorie` : 'Aucune tâche trouvée'}
            </div>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center h-[48px] bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all px-6"
              style={{ gap: 24 }}
            >
              {/* Checkbox carrée */}
              <input
                type="checkbox"
                checked={task.status === 'accomplie'}
                onChange={() => handleToggleStatus(task)}
                className="form-checkbox w-5 h-5 rounded border-gray-300 text-indigo-500 focus:ring-0 mr-4"
                style={{ flexShrink: 0 }}
              />
              {/* Titre + description + priorité + catégorie */}
              <div className="flex-1 flex items-center min-w-0 gap-2">
                <span className={`truncate font-medium text-base ${task.status === 'accomplie' ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                  {task.title}
                </span>
                {task.description && (
                  <span className="ml-2 px-2 py-0.5 bg-gray-50 text-gray-600 rounded text-xs font-semibold">
                    {task.description}
                  </span>
                )}
                <span className="ml-2 px-2 py-0.5 bg-purple-50 text-purple-600 rounded text-xs font-semibold flex items-center gap-1">
                  <span className="text-xs">
                    {task.category === 'PERSONAL' ? '👤' :
                     task.category === 'WORK' ? '💼' :
                     task.category === 'HEALTH' ? '🏥' :
                     task.category === 'EDUCATION' ? '📚' :
                     task.category === 'FINANCE' ? '💰' :
                     task.category === 'TRAVEL' ? '✈️' :
                     task.category === 'SHOPPING' ? '🛍️' : '📝'}
                  </span>
                  {task.category === 'PERSONAL' ? 'Personnel' :
                   task.category === 'WORK' ? 'Travail' :
                   task.category === 'HEALTH' ? 'Santé' :
                   task.category === 'EDUCATION' ? 'Éducation' :
                   task.category === 'FINANCE' ? 'Finance' :
                   task.category === 'TRAVEL' ? 'Voyage' :
                   task.category === 'SHOPPING' ? 'Shopping' : 'Autre'}
                </span>
                {task.priority && (
                  <span className={`ml-2 px-2 py-0.5 rounded text-xs font-semibold ${
                    task.priority === 'IMPORTANTE' ? 'bg-red-50 text-red-600' :
                    task.priority === 'MOYENNE' ? 'bg-yellow-50 text-yellow-600' :
                    'bg-blue-50 text-blue-600'
                  }`}>
                    {task.priority === 'IMPORTANTE' ? 'Importante' :
                     task.priority === 'MOYENNE' ? 'Moyenne' : 'Mineur'}
                  </span>
                )}
              </div>
              {/* Date de création */}
              <div className="flex items-center text-gray-500 text-sm font-medium min-w-[120px] justify-end gap-2">
                <ClockIcon className="w-4 h-4" />
                {new Date(task.createdAt).toLocaleDateString('fr-FR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                })}
              </div>
              {/* Menu contextuel */}
              <div className="relative flex items-center ml-4">
                <button
                  className="p-2 rounded-full hover:bg-gray-100 transition text-gray-400 hover:text-gray-600"
                  title="Plus d'options"
                  onClick={() => setOpenMenuId(openMenuId === task.id ? null : task.id)}
                >
                  <EllipsisVerticalIcon className="w-6 h-6" />
                </button>
                {openMenuId === task.id && (
                  <div className="absolute right-0 top-10 z-20 bg-white border border-gray-200 rounded-xl shadow-lg flex flex-col min-w-[120px] animate-fade-in">
                    <button
                      onClick={() => { setEditTask(task); setOpenMenuId(null); }}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-t-xl transition"
                    >
                      <PencilIcon className="w-5 h-5" /> Modifier
                    </button>
                    <button
                      onClick={() => {
                        setDeleteTaskId(task.id);
                        setOpenMenuId(null);
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-xl transition"
                    >
                      <TrashIcon className="w-5 h-5" /> Supprimer
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      {/* Barre noire Create new task */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[420px] h-12 flex items-center bg-black text-white rounded-full shadow-lg px-6 z-50 cursor-pointer" onClick={() => setModalOpen(true)}>
        <PlusIcon className="w-6 h-6 mr-3" />
        <span className="font-medium text-base flex-1">Create new task</span>
        <span className="bg-neutral-800 rounded px-2 py-0.5 text-xs font-semibold ml-2">⌘</span>
        <span className="bg-neutral-800 rounded px-2 py-0.5 text-xs font-semibold ml-1">N</span>
      </div>
      <TaskModal 
        open={modalOpen || !!editTask}
        onClose={() => { setModalOpen(false); setEditTask(null); }}
        onTaskCreated={() => {
          fetchTasks();
          if (onTaskCreated) {
            onTaskCreated();
          }
        }}
        editTask={editTask}
        setEditTask={setEditTask}
      />
      <ConfirmDeleteModal
        open={deleteTaskId !== null}
        onClose={() => setDeleteTaskId(null)}
        onConfirm={() => {
          if (deleteTaskId !== null) handleDeleteTask(deleteTaskId);
          setDeleteTaskId(null);
        }}
      />
    </div>
  );
} 