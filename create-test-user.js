const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function createTestUser() {
  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: 'test@example.com' }
    });

    if (existingUser) {
      console.log('✅ Utilisateur de test existe déjà');
      return;
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Créer l'utilisateur de test
    const user = await prisma.user.create({
      data: {
        name: 'Utilisateur Test',
        email: 'test@example.com',
        password: hashedPassword,
      },
    });

    console.log('✅ Utilisateur de test créé:', user.email);
    
    // Créer quelques tâches de test
    const tasks = await Promise.all([
      prisma.task.create({
        data: {
          title: 'Tâche de test 1',
          description: 'Description de la première tâche de test',
          status: 'non accomplie',
          userId: user.id,
        },
      }),
      prisma.task.create({
        data: {
          title: 'Tâche de test 2',
          description: 'Description de la deuxième tâche de test',
          status: 'accomplie',
          userId: user.id,
        },
      }),
    ]);

    console.log('✅ Tâches de test créées:', tasks.length);
    
  } catch (error) {
    console.error('❌ Erreur lors de la création:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestUser(); 