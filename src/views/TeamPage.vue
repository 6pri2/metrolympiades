
<script setup>
import NavBar from '@/components/NavBar.vue';
import { ref, onMounted } from 'vue';

const teamName = ref('');
const teamMembers = ref([]);
const isLoading = ref(true);
const error = ref('');

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
    teamMembers.value = data.members;

  } catch (err) {
    console.error('Erreur:', err);
    error.value = 'Impossible de charger les informations de l\'équipe';
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchTeamInfo();
});
</script>

<template>
  <div class="team-view">
    <NavBar/>

    <div class="team-container">
      <h1>{{ teamName }}</h1>

      <div v-if="isLoading" class="loading">Chargement...</div>
      <div v-else class="team-info">
        <h3>Membres de l'équipe :</h3>
        <ul>
          <li v-for="(member, index) in teamMembers" :key="index">{{ member }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.team-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.loading {
  text-align: center;
  color: #999;
  font-size: 1.2rem;
}

.team-info {
  margin-top: 20px;
}
</style>

