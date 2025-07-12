// app/api/tasks/route.ts
// Ce fichier gère toutes les routes API liées aux tâches (GET, POST, PATCH)

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

// Route GET : Récupère toutes les tâches de l'utilisateur connecté
export async function GET() {
  try {
    // Récupère l'ID de l'utilisateur depuis les cookies
    const userId = (await cookies()).get('user_id')?.value;

    // Vérifie si l'utilisateur est connecté
    if (!userId) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    // Récupère toutes les tâches de l'utilisateur, triées par date de création
    const tasks = await prisma.task.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    // Gestion des erreurs avec log dans la console
    console.error('Erreur lors de la récupération des tâches:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// Route POST : Crée une nouvelle tâche
export async function POST(request: Request) {
  try {
    // Récupère l'ID de l'utilisateur depuis les cookies
    const userId = (await cookies()).get('user_id')?.value;

    // Vérifie si l'utilisateur est connecté
    if (!userId) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    // Récupère les données de la requête
    const data = await request.json();

    // Vérifie que les champs requis sont présents
    if (!data.title) {
      return NextResponse.json({ error: 'Titre requis' }, { status: 400 });
    }
    if (!data.category) {
      return NextResponse.json({ error: 'Catégorie requise' }, { status: 400 });
    }

    // Crée la nouvelle tâche dans la base de données
    const task = await prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        priority: data.priority,
        category: data.category,
        userId: userId
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    // Gestion des erreurs avec log dans la console
    console.error('Erreur lors de la création de la tâche:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// Route PATCH : Modifie une tâche existante
export async function PATCH(request: Request) {
  try {
    // Récupère l'ID de l'utilisateur depuis les cookies
    const userId = (await cookies()).get('user_id')?.value;

    // Vérifie si l'utilisateur est connecté
    if (!userId) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    // Récupère les données de la requête
    const data = await request.json();

    // Met à jour la tâche dans la base de données
    const updatedTask = await prisma.task.update({
      where: { id: data.id },
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
      },
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    // Gestion des erreurs avec log dans la console
    console.error('Erreur lors de la modification de la tâche:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
