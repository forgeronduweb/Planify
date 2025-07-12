const axios = require('axios');

// Configuration d'axios pour inclure les cookies
axios.defaults.withCredentials = true;

async function testAuth() {
  try {
    console.log('🔐 Test d\'authentification...');
    
    // Test de connexion
    const loginResponse = await axios.post('http://localhost:3000/api/auth/login', {
      email: 'test@example.com',
      password: 'password123'
    });
    
    console.log('✅ Connexion réussie:', loginResponse.data);
    console.log('🍪 Cookies reçus:', loginResponse.headers['set-cookie']);
    
    // Attendre un peu pour s'assurer que le cookie est bien défini
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Test de récupération des tâches
    const tasksResponse = await axios.get('http://localhost:3000/api/tasks');
    console.log('✅ Tâches récupérées:', tasksResponse.data);
    
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('❌ Erreur:', error.response?.status, error.response?.data);
      console.error('📋 Headers de réponse:', error.response?.headers);
    } else {
      console.error('❌ Erreur inconnue:', error);
    }
  }
}

testAuth(); 