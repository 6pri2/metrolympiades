<script setup>
import { ref, computed, onMounted } from 'vue';
import NavBar from '@/components/Navbar.vue';

const matches = ref([]);
const isLoading = ref(true);
const errorMessage = ref(null); // Pour gérer les erreurs
const filter = ref('all'); // Filtre : 'all', 'upcoming', 'finished'
const viewMode = ref('all'); // Mode d'affichage : 'all' pour tous les matchs, 'my' pour mes matchs

// Fonction pour récupérer les matchs via l'API
const fetchMatches = async () => {
  isLoading.value = true;
  errorMessage.value = null;
  try {
    const endpoint =
      viewMode.value === 'all'
        ? 'http://localhost:3000/matches' // Tous les matchs
        : 'http://localhost:3000/matches/me'; // Matchs de l'équipe de l'utilisateur

    const response = await fetch(endpoint, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur lors du chargement des matchs');
    }

    matches.value = await response.json();
  } catch (error) {
    console.error('Erreur:', error);
    errorMessage.value = error.message;
    matches.value = [];
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

    <!-- Sélecteur pour basculer entre "Tous les matchs" et "Mes matchs" -->
    <div class="view-mode-container">
      <button
        :class="{ active: viewMode === 'all' }"
        @click="viewMode = 'all'; fetchMatches()"
      >
        Tous les matchs
      </button>
      <button
        :class="{ active: viewMode === 'my' }"
        @click="viewMode = 'my'; fetchMatches()"
      >
        Mes matchs
      </button>
    </div>

    <!-- Filtre pour les matchs -->
    <div class="filter-container">
      <label for="filter">Filtrer les matchs :</label>
      <select id="filter" v-model="filter">
        <option value="all">Tous les matchs</option>
        <option value="upcoming">À venir</option>
        <option value="finished">Terminés</option>
      </select>
    </div>

    <!-- Affichage des matchs -->
    <div v-if="isLoading" class="loading">Chargement des matchs...</div>
    <div v-else-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
    <div v-else-if="matches.length === 0" class="no-matches">
      Aucun match trouvé.
    </div>
    <div v-else class="matches-list">
      <h2>Liste des Matchs</h2>
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

.view-mode-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.view-mode-container button {
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #f0f0f0;
  color: #333;
  transition: background-color 0.3s;
}

.view-mode-container button.active {
  background-color: #42b983;
  color: white;
}

.view-mode-container button:hover {
  background-color: #3aa876;
  color: white;
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

.error-message {
  color: red;
  text-align: center;
  font-weight: bold;
}

.no-matches {
  text-align: center;
  font-style: italic;
  color: #666;
}
</style>