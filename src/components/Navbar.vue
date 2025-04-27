<template>
  <div class="navbar-container">
    <div class="header">
      <h1>Metrolympiades</h1>
      <h2>{{ teamName }}</h2>
    </div>

    <nav class="navigation">
      <router-link to="/leaderboard" active-class="active">Classement générale</router-link>
      <router-link to="/team" active-class="active">Mon équipe</router-link>
      <router-link to="/games" active-class="active">Mes matchs</router-link>
      <button @click="logout">Se déconnecter</button>
    </nav>
  </div>
</template>


<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'NavBar',
  setup() {
    const teamName = ref('');
    const router = useRouter();

    // Récupérer les infos de l'équipe de l'utilisateur via l'API
    const fetchTeamInfo = async () => {
      const token = localStorage.getItem('authToken');

      try {
        const response = await fetch('http://localhost:3000/teams/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error('Erreur lors de la récupération des données');

        const data = await response.json();
        teamName.value = data.name;

      } catch (err) {
        console.error('Erreur:', err);
        router.push('/login');
      }
    }

    // Fonction pour se déconnecter
    const logout = () => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      router.push('/login');
    }

    // Appel de la fonction pour charger les données de l'équipe au montage du composant
    onMounted(() => {
      fetchTeamInfo();
    });

    return {
      teamName,
      logout
    };
  }
}
</script>

<style scoped>
.navbar-container {
  background-color: #f4f4f9;
  padding: 30px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.header h1 {
  font-size: 2.5rem;
  font-weight: 600;
  color: #42b983;
  margin: 0;
}

.header h2 {
  font-size: 1.4rem;
  color: #555;
}

.navigation {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 2px solid #eeeeee;
}

.navigation a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 30px;
  transition: all 0.3s ease;
}

.navigation a:hover {
  background: #42b983;
  color: white;
  transform: scale(1.05);
}

.active {
  font-weight: bold;
  color: #42b983;
  border-bottom: 3px solid #42b983;
}

button {
  padding: 10px 20px;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 25px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background: #d32f2f;
}
</style>
