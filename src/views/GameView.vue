<script setup>
import { ref, computed, onMounted } from 'vue';
import NavBar from '@/components/Navbar.vue';

const matches = ref([]);
const isLoading = ref(true);
const filter = ref('all'); // Filtre : 'all', 'upcoming', 'ongoing', 'finished'

// Fonction pour récupérer les matchs de l'équipe via l'API
const fetchMatches = async () => {
  isLoading.value = true;
  try {
    const response = await fetch('http://localhost:3000/matches/me', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });

    if (!response.ok) throw new Error('Erreur lors du chargement des matchs');

    matches.value = await response.json();
  } catch (error) {
    console.error('Erreur:', error);
    matches.value = []; // Données vides en cas d'erreur
  } finally {
    isLoading.value = false;
  }
};

// Filtrer les matchs en fonction du statut
const filteredMatches = computed(() => {
  if (filter.value === 'all') return matches.value;

  const now = new Date();
  return matches.value.filter(match => {
    const matchDate = new Date(match.startedAt);
    if (filter.value === 'upcoming') return matchDate > now;
    if (filter.value === 'ongoing') return matchDate <= now && !match.team1Score && !match.team2Score;
    if (filter.value === 'finished') return match.team1Score !== null && match.team2Score !== null;
  });
});

// Charger les matchs au montage du composant
onMounted(() => {
  fetchMatches();
});
</script>

<template>
  <div class="games-view">
    <nav-bar></nav-bar>

    <div class="filter-container">
      <select v-model="filter">
        <option value="all">Tous les matchs</option>
        <option value="upcoming">À venir</option>
        <option value="ongoing">En cours</option>
        <option value="finished">Terminés</option>
      </select>
    </div>

    <div v-if="isLoading" class="loading">Chargement des matchs...</div>

    <div v-else class="matches-list">
      <h2>Mes Matchs</h2>
      <ul>
        <li v-for="match in filteredMatches" :key="match.id" class="match-item">
          <div class="match-info">
            <p><strong>{{ match.team1 }}</strong> vs <strong>{{ match.team2 }}</strong></p>
            <p>Activité : {{ match.activity }}</p>
            <p>Date : {{ new Date(match.startedAt).toLocaleString() }}</p>
            <p v-if="match.team1Score !== null && match.team2Score !== null">
              Score : {{ match.team1Score }} - {{ match.team2Score }}
            </p>
          </div>
          <router-link :to="`/matches/${match.id}`" class="details-link">Voir détails</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.games-view {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.filter-container {
  margin-bottom: 20px;
  text-align: center;
}

.filter-container select {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.matches-list {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.match-item {
  padding: 15px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.match-info p {
  margin: 5px 0;
}

.details-link {
  padding: 8px 12px;
  background-color: #42b983;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.details-link:hover {
  background-color: #3aa876;
}

.loading {
  text-align: center;
  font-style: italic;
  color: #666;
}
</style>