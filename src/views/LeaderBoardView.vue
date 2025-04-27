<template>
  <div class="team-view">
    <div class="team-container">
      <nav-bar v-if="isAuthenticated"></nav-bar>
      <div v-else class="auth-buttons">
        <router-link to="/login" class="auth-button">Se connecter</router-link>
      </div>

      <input v-model="teamName" class="team-name" disabled />

      <div v-if="isLoading" class="loading">Chargement du classement...</div>

      <div v-else class="team-info">
        <h3>Classement :</h3>
        <ul>
          <li v-for="(ranking, index) in rankings" :key="index">
            <strong>{{ index + 1 }}. {{ ranking.team }}</strong> — {{ ranking.points }} points
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from '@/components/Navbar.vue';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const rankings = ref([]);
const isLoading = ref(true);
const teamName = ref('');

const isAuthenticated = computed(() => {
  return !!localStorage.getItem('authToken');
});

function goBack() {
  router.push('/');
}

async function fetchTeamInfo() {
  if (!isAuthenticated.value) {
    teamName.value = "Invité";
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/user-info', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      teamName.value = data.team || "Mon équipe";
    } else {
      console.error('Erreur lors de la récupération des informations utilisateur');
      teamName.value = "Mon équipe";
    }
  } catch (error) {
    console.error('Erreur réseau', error);
    teamName.value = "Mon équipe";
  }
}

async function fetchRankings() {
  isLoading.value = true;
  try {
    const response = await fetch('http://localhost:3000/ranking');
    if (!response.ok) throw new Error('Erreur lors du chargement du classement');
    rankings.value = await response.json();
  } catch (error) {
    console.error('Erreur de chargement:', error);
    // Données de démo en cas d'erreur
    rankings.value = [
      { team: "Les Codeurs Fous", points: 15 },
      { team: "Bug Busters", points: 12 },
      { team: "Commit & Conquer", points: 11 },
      { team: "404 Team Not Found", points: 8 },
      { team: "Les Script Kiddies", points: 5 }
    ];
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  fetchTeamInfo();
  fetchRankings();
});
</script>

<style scoped>
.team-view {
  padding: 20px;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.team-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.auth-buttons {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.auth-button {
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.auth-button:hover {
  background-color: #3aa876;
}

.team-name {
  font-size: 1.5rem;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 20px;
  width: 100%;
  background-color: #f9f9f9;
}

.save-btn-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background: #388e3c;
}

.loading {
  text-align: center;
  padding: 20px;
  font-style: italic;
  color: #666;
}

.team-info {
  margin-top: 20px;
}

.team-info h3 {
  text-align: center;
  margin-bottom: 15px;
  color: #333;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 12px 15px;
  margin: 8px 0;
  background-color: #f9f9f9;
  border-radius: 8px;
  border-left: 4px solid #42b983;
  transition: transform 0.2s;
}

li:hover {
  transform: translateX(5px);
}

.team-info ul li:nth-child(1) {
  border-left-color: gold;
  background-color: rgba(255, 215, 0, 0.1);
}

.team-info ul li:nth-child(2) {
  border-left-color: silver;
  background-color: rgba(192, 192, 192, 0.1);
}

.team-info ul li:nth-child(3) {
  border-left-color: #cd7f32;
  background-color: rgba(205, 127, 50, 0.1);
}

@media (max-width: 600px) {
  .team-container {
    padding: 15px;
  }
  
  .team-name {
    font-size: 1.2rem;
  }
  
  li {
    padding: 10px;
    font-size: 0.9rem;
  }
}
</style>