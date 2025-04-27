<script setup>
import { ref, onMounted, computed } from 'vue';
import NavBar from '@/components/NavBar.vue';

const teamName = ref('');
const teamMembers = ref([]);
const newMember = ref('');
const isLoading = ref(true);
const originalTeamName = ref('');
const originalTeamMembers = ref([]);

const isModified = computed(() => {
  return (
    teamName.value !== originalTeamName.value ||
    JSON.stringify(teamMembers.value) !== JSON.stringify(originalTeamMembers.value)
  );
});

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
    originalTeamName.value = data.name;
    originalTeamMembers.value = Array.isArray(data.members) ? [...data.members] : [];

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

const removeMember = (index) => {
  teamMembers.value.splice(index, 1);
};

const saveChanges = async () => {
  const token = localStorage.getItem('authToken');

  try {
    const response = await fetch('http://localhost:3000/teams/me', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: teamName.value,
        members: teamMembers.value
      })
    });

    if (!response.ok) throw new Error('Erreur lors de la sauvegarde des modifications');

    alert('Les modifications ont été enregistrées');

    originalTeamName.value = teamName.value;
    originalTeamMembers.value = [...teamMembers.value];
  } catch (err) {
    console.error('Erreur:', err);
    alert('Erreur lors de l\'enregistrement des modifications');
  }
};


onMounted(() => {
  fetchTeamInfo();
});
</script>

<template>
  <div class="team-view">
    <div class="team-container">
      <nav-bar></nav-bar>
      <input v-model="teamName" class="team-name" />
      <div class="save-btn-wrapper">
        <button @click="saveChanges" :disabled="!isModified">Enregistrer les modifications</button>
      </div>
      <div v-if="isLoading" class="loading">Chargement...</div>
      <div v-else class="team-info">
        <h3>Membres de l'équipe :</h3>
        <ul>
          <li v-for="(member, index) in teamMembers" :key="index">
            <span v-if="index === 0">{{ member }} (Capitaine)</span>
            <input v-else v-model="teamMembers[index]" />
            <span v-if="index !== 0" class="remove-cross" @click="removeMember(index)">×</span>
          </li>
        </ul>
        <input v-model="newMember" placeholder="Ajouter un coéquipier" />
        <button @click="addMember">Ajouter</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

button:disabled {
  background: #ccc;
  cursor: not-allowed;
  opacity: 0.7;
}


.save-btn-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}


.remove-cross {
  margin-left: 10px;
  color: red;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.remove-cross:hover {
  transform: scale(1.3);
}


.team-name {
  font-size: 1.5rem;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 20px;
  width: 100%;
}


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

ul input {
  padding: 6px;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: auto;
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
