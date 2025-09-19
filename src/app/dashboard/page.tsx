'use client';
// Ce fichier contient le composant principal du tableau de bord

import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
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
  type Task = { category: string; [key: string]: unknown };
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Fonction pour récupérer les tâches
  const fetchTasks = useCallback(async () => {
    try {
      const res = await axios.get('/api/tasks');
      setTasks(res.data as Task[]);
    } catch (error) {
      console.error('Erreur lors du chargement des tâches:', error);
    }
  }, []);

  // (Optionnel) Calculer les compteurs de tâches par catégorie si nécessaire

  // Fonction pour gérer le filtre de catégorie
  const handleCategoryFilter = (category: string | null) => {
    setSelectedCategory(category);
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
    (async () => {
      try {
        const res = await axios.get('/api/user');
        setUserName(res.data.name);
      } catch (error) {
        console.error('Erreur lors du chargement des informations utilisateur:', error);
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          router.push('/login');
        }
      }
    })();
    fetchTasks();
  }, [fetchTasks, router]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar avec groupes et catégories */}
      <Sidebar
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategoryFilter}
        onLogout={handleLogout}
      />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col relative">
        {/* Header aligné verticalement avec Catégorie */}
        <div className="pt-[48px] px-4 md:px-8">
          <div className="w-[888px] mx-auto h-[48px] flex items-center justify-between">
            <DashboardHeader userName={userName || 'Sullivan'} onPriorityChange={() => { /* handled in child or future */ }} />
          </div>
        </div>
        {/* Centered content wrapper */}
        <div className="w-[888px] mx-auto flex flex-col h-full">
          {/* Liste des tâches */}
          <TaskList
            onTaskCreated={fetchTasks}
          />
        </div>
      </div>
    </div>
  );
}
