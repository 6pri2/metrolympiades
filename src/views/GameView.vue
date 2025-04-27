<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import NavBar from '@/components/NavBar.vue';

const matches = ref([]);
const isLoading = ref(true);
const errorMessage = ref(null);
const router = useRouter();

// Fonction pour récupérer les matchs de l'utilisateur
const fetchMatches = async () => {
  isLoading.value = true;
  errorMessage.value = null;
  try {
    const response = await fetch('http://localhost:3000/matches/me', {
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

// Fonction pour supprimer un match
const deleteMatch = async (matchId) => {
  try {
    const response = await fetch(`http://localhost:3000/matches/${matchId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur lors de la suppression du match');
    }

    alert('Match supprimé avec succès !');
    fetchMatches();
  } catch (error) {
    console.error('Erreur lors de la suppression du match:', error);
    alert('Impossible de supprimer ce match.');
  }
};

// Fonction pour rediriger vers la page de création d'un nouveau match
const redirectToCreateMatch = () => {
  router.push('/game');
};

// Charger les matchs au montage du composant
onMounted(() => {
  fetchMatches();
});
</script>

<template>
  <div class="games-view">
    <nav-bar></nav-bar>

    <!-- Bouton pour créer un match -->
    <div class="add-match-container">
      <button @click="redirectToCreateMatch" class="add-match-button">
        Créer un match
      </button>
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
      <h2>Mes Matchs</h2>
      <ul>
        <li v-for="match in matches" :key="match.id" class="match-item">
          <div class="match-info">
            <p><strong>{{ match.team1 }}</strong> vs <strong>{{ match.team2 }}</strong></p>
            <p>Activité : {{ match.activity }}</p>
            <p>Date : {{ new Date(match.startedAt).toLocaleString() }}</p>
            <p v-if="match.team1Score !== null && match.team2Score !== null">
              Score : {{ match.team1Score }} - {{ match.team2Score }}
            </p>
          </div>

          <!-- Bouton pour supprimer un match -->
          <button
            @click="deleteMatch(match.id)"
            class="delete-match-button"
          >
            Supprimer
          </button>
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

.add-match-container {
  text-align: center;
  margin-bottom: 20px;
}

.add-match-button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.add-match-button:hover {
  background-color: #3aa876;
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

.delete-match-button {
  padding: 8px 12px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.delete-match-button:hover {
  background-color: #e60000;
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
