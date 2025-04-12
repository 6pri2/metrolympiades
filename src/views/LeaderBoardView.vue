<template>
  <div class="leaderboard-container">
    <div class="header">
      <h1>Metrolympiades</h1>
      <h2>{{ teamName }}</h2>
    </div>

    <nav class="navigation">
      <router-link to="/leaderboard" class="active">Classement générale</router-link>
      <router-link to="/team">Mon équipe</router-link>
      <router-link to="/games">Mes matchs</router-link>
      <button @click="logout">Se déconnecter</button>
    </nav>

    <div class="content">
      <h2>Classement générale</h2>
      
      <div v-if="isLoading" class="loading">Chargement en cours...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else class="teams-list">
        <div v-for="(team, index) in rankings" :key="team.team" class="team-card">
          <div class="rank" :class="getRankClass(index)">{{ index + 1 }}</div>
          <div class="team-info">
            <h3>{{ team.team }}</h3>
            <p>{{ team.points }}pts</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const teamName = ref('');
const rankings = ref([]);
const isLoading = ref(true);
const error = ref('');


function getRankClass(index) {
  return [
    'first-place',
    'second-place',
    'third-place'
  ][index] || '';
}

async function fetchTeamInfo() {
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


async function fetchRankings() {
  isLoading.value = true;
  error.value = '';
  
  try {
    const response = await fetch('http://localhost:3000/ranking');
    
    if (!response.ok) throw new Error('Erreur lors du chargement du classement');
    
    rankings.value = await response.json();
    
  } catch (err) {
    console.error('Erreur:', err);
    error.value = 'Impossible de charger le classement';
    rankings.value = [
      { team: "Les Codeurs Fous", points: 15 },
      { team: "Bug Busters", points: 12 },
      { team: "Commit & Conquer", points: 11 }
    ];
  } finally {
    isLoading.value = false;
  }
}

function logout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  router.push('/login');
}

onMounted(() => {
  fetchTeamInfo();
  fetchRankings();
});
</script>
  
<style scoped>
.leaderboard-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 30px;
  font-family: 'Arial', sans-serif;
  background: #f4f4f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
}

.header h1 {
  color: #42b983;
  font-size: 2.5rem;
  font-weight: 600;
  letter-spacing: 1px;
  margin: 0;
}

.header h2 {
  color: #555;
  font-size: 1.4rem;
  margin-top: 5px;
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

.content {
  margin-top: 20px;
}

.content h2 {
  text-align: center;
  margin-bottom: 35px;
  font-size: 2rem;
  color: #333;
  font-weight: 600;
}

.loading {
  text-align: center;
  color: #999;
  font-size: 1.2rem;
}

.error {
  text-align: center;
  color: #f44336;
  font-size: 1.2rem;
}

.teams-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.team-card {
  display: flex;
  align-items: center;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.team-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.15);
}

.rank {
  font-size: 1.6rem;
  font-weight: bold;
  width: 50px;
  text-align: center;
  margin-right: 20px;
}

.first-place {
  color: gold;
}

.second-place {
  color: silver;
}

.third-place {
  color: #cd7f32;
}

.team-info h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 500;
  color: #333;
}

.team-info p {
  margin: 5px 0 0;
  color: #777;
  font-size: 0.95rem;
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
  margin-top: 20px;
  width: 100%;
}

button:hover {
  background: #d32f2f;
}
</style>
