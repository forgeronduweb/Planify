import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const userId = (await cookies()).get('user_id')?.value;

    if (!userId) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    // Récupérer l'utilisateur depuis la base de données
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: { // Sélectionnez uniquement les champs nécessaires
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      // Si l'utilisateur n'est pas trouvé (par exemple, ID invalide ou utilisateur supprimé)
      // Supprimer le cookie invalide et renvoyer une erreur 404 ou 401
       const response = NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
       response.cookies.delete('user_id'); // Supprimer le cookie invalide
       return response;
    }

    // Retourner les informations de l'utilisateur
    return NextResponse.json(user);

  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
} 