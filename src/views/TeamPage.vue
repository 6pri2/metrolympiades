<script setup>
import { ref, onMounted } from 'vue';
import NavBar from '@/components/NavBar.vue';

const teamName = ref('');
const teamMembers = ref([]);
const newMember = ref('');
const isLoading = ref(true);

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
    teamMembers.value = Array.isArray(data.members) ? data.members : [];
  } catch (err) {
    console.error('Erreur:', err);
  } finally {
    isLoading.value = false;
  }
};


const addMember = () => {
  if (newMember.value.trim() !== '') {
    if (Array.isArray(teamMembers.value)) {
      teamMembers.value.push(newMember.value.trim());
    } else {
      console.error("teamMembers n'est pas un tableau");
    }
    newMember.value = '';
  }
};


onMounted(() => {
  fetchTeamInfo();
});
</script>

<template>
  <div class="team-view">
    <nav-bar></nav-bar>
    <div class="team-container">
      <h1>{{ teamName }}</h1>
      <div v-if="isLoading" class="loading">Chargement...</div>
      <div v-else class="team-info">
        <h3>Membres de l'équipe :</h3>
        <ul>
          <li v-for="(member, index) in teamMembers" :key="index">
            <span>{{ member }}</span>
          </li>
        </ul>
        <input v-model="newMember" placeholder="Ajouter un coéquipier" />
        <button @click="addMember">Ajouter</button>
        <button @click="saveChanges">Enregistrer les modifications</button>
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

.team-info {
  margin-top: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
}

input {
  padding: 10px;
  margin-top: 10px;
  width: 100%;
  border-radius: 25px;
  border: 1px solid #ccc;
}

button {
  padding: 10px 20px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background: #388e3c;
}
</style>
