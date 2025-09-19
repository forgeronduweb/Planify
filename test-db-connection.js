// Script pour tester la connexion à la base de données
const { PrismaClient } = require('@prisma/client');

async function testConnection() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔄 Test de connexion à la base de données...');
    
    // Test de connexion simple
    await prisma.$connect();
    console.log('✅ Connexion réussie !');
    
    // Test d'une requête simple
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ Requête test réussie :', result);
    
  } catch (error) {
    console.error('❌ Erreur de connexion :');
    console.error('Code:', error.code);
    console.error('Message:', error.message);
    
    if (error.message.includes('database server')) {
      console.log('\n💡 Solutions possibles :');
      console.log('1. Vérifiez que votre DATABASE_URL est correcte');
      console.log('2. Vérifiez que votre base Render est active');
      console.log('3. Vérifiez les credentials (username/password)');
    }
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
