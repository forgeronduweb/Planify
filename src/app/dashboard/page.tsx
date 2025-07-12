'use client';
// Ce fichier contient le composant principal du tableau de bord

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import TaskList from '../components/TaskList';

// Configuration d'axios pour inclure les cookies
axios.defaults.withCredentials = true;

export default function DashboardPage() {
  // Hooks pour la navigation et l'état
  const router = useRouter();
  // État pour le nom de l'utilisateur
  const [userName, setUserName] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('Toutes');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null); // null = "Toutes"
  const [tasks, setTasks] = useState<any[]>([]);

  // Fonction pour récupérer les informations de l'utilisateur
  const fetchUser = async () => {
    try {
      const res = await axios.get('/api/user');
      setUserName(res.data.name);
    } catch (error) {
      console.error('Erreur lors du chargement des informations utilisateur:', error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        router.push('/login');
      }
    }
  };

  // Fonction pour récupérer les tâches
  const fetchTasks = async () => {
    try {
      const res = await axios.get('/api/tasks');
      setTasks(res.data);
    } catch (error) {
      console.error('Erreur lors du chargement des tâches:', error);
    }
  };

  // Calculer les compteurs de tâches par catégorie
  const taskCounts = tasks.reduce((acc, task) => {
    acc[task.category] = (acc[task.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Fonction pour gérer le filtre de catégorie
  const handleCategoryFilter = (category: string | null) => {
    setCategoryFilter(category);
  };

  // Fonction pour se déconnecter
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  // Charge les informations utilisateur et les tâches au montage du composant
  useEffect(() => {
    fetchUser();
    fetchTasks();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar avec titre Catégorie en haut */}
      <Sidebar 
        showTitle={true} 
        onCategoryFilter={handleCategoryFilter}
        selectedCategory={categoryFilter}
        taskCounts={taskCounts}
        onLogout={handleLogout}
      />
      {/* Main content area */}
      <div className="flex-1 flex flex-col relative">
        {/* Header aligné verticalement avec Catégorie */}
        <div className="pt-[48px] px-4 md:px-8">
          <div className="w-[888px] mx-auto h-[48px] flex items-center justify-between">
            <DashboardHeader userName={userName || 'Sullivan'} onPriorityChange={setPriorityFilter} />
          </div>
        </div>
        {/* Centered content wrapper */}
        <div className="w-[888px] mx-auto flex flex-col h-full">
          {/* Liste des tâches */}
          <TaskList 
            categoryFilter={categoryFilter} 
            onTaskCreated={fetchTasks}
          />
          {/* Filter and Sort Controls */}
          {/* Après <TaskList />, supprimer le bloc de filtres (div mb-4 flex flex-wrap gap-4 items-center ...) */}

          {/* Task List */}
          {/* Supprimer complètement le bloc <div className="overflow-y-scroll scrollbar-hide flex-1">...</div> */}
          {/* Supprimer complètement le bloc <ul>...</ul> */}
        </div>

        {/* Add New Task Button at the bottom */}
        {/* Supprimer ce bloc :
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 px-4 w-full max-w-md">
          <button
            onClick={() => {
              // setEditMode(false); // S'assurer qu'on est en mode création
              // setEditTaskId(null);
              // setTitle(''); // Réinitialiser les champs
              // setDescription('');
              // setIsModalOpen(true); // Ouvre la modale
            }}
            className="bg-black text-white text-lg px-6 py-3 rounded-full shadow-lg flex items-center space-x-2"
          >
            <span className="text-xl">+</span>
            <span>Create new task</span>
            <span className="text-gray-400 ml-4">⌘ N</span>
          </button>
        </div> */}

        {/* Task Modal */}
        {/* isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-96">
              <h2 className="text-xl font-bold mb-4">{editMode ? 'Modifier Tâche' : 'Créer Nouvelle Tâche'}</h2>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description (Optionnel)</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                ></textarea>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsModalOpen(false)} // Ferme la modale sans sauvegarder
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
                >
                  Annuler
                </button>
                <button
                  onClick={handleAddOrUpdateTask}
                  className={`px-4 py-2 text-white rounded-md ${editMode ? 'bg-green-600' : 'bg-blue-600'}`}
                >
                  {editMode ? 'Sauvegarder' : 'Ajouter'}
                </button>
              </div>
            </div>
          </div>
        ) */}
      </div>
    </div>
  );
}
