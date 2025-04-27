<script setup>
import { ref, onMounted } from 'vue';
import NavBar from '@/components/NavBar.vue';


const teamName = ref('');
const teamId = ref('');
const isLoading = ref(true);
const loading = ref(false);

const selectedOpponent = ref('');
const selectedActivity = ref('');
const startTime = ref('');
const teamScore = ref(0);
const opponentScore = ref(0);

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
    teamId.value = data.id;
  } catch (err) {
    console.error('Erreur:', err);
  } finally {
    isLoading.value = false;
  }
};

const saveMatch = async () => {
  const token = localStorage.getItem('authToken');  

  if (!selectedOpponent.value || !selectedActivity.value || !startTime.value) {
    alert('Veuillez remplir tous les champs du formulaire.');
    return;
  }

  const currentDate = new Date();
  const [hours, minutes] = startTime.value.split(':');
  currentDate.setHours(hours, minutes, 0, 0);

  const formattedStartTime = currentDate.toISOString();

  const matchData = {
    team2Id: selectedOpponent.value,   
    activityId: selectedActivity.value, 
    startedAt: formattedStartTime,     
    team1Score: teamScore.value,       
    team2Score: opponentScore.value,   
  };

  try {
    const response = await fetch('http://localhost:3000/matches', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(matchData),
    });

    if (!response.ok) {
      const errorData = await response.json(); 
      throw new Error(errorData.message || 'Erreur lors de la création du match');
    }

    const data = await response.json(); 
    alert(data.message || 'Match créé avec succès !'); 

   
    selectedOpponent.value = '';
    selectedActivity.value = '';
    startTime.value = '';
    teamScore.value = 0;
    opponentScore.value = 0;
  } catch (err) {
    console.error('Erreur:', err);
    alert(`Erreur lors de la création du match : ${err.message}`);
  }
};

const apiOpponents = ref([]);

function fetchOpponents() {
  loading.value = true;
  const result = fetch("http://localhost:3000/teams");
  result.then((response) => response.json())
    .then((data) => {
      apiOpponents.value = data.filter(team => team.name !== teamName.value);
      console.log("nom de la team = ". teamName);
      console.log("nom de la team advers = ". team.name)
      loading.value = false;
    });
}

fetchOpponents();

const apiActivities = ref([]);
function fetchActivities() {
  loading.value = true;
  const result = fetch("http://localhost:3000/activities");
  result.then((response) => response.json())
    .then((data) => {
      apiActivities.value = data;
      loading.value = false;
    });
}

fetchActivities();

onMounted(async()=>{
  await fetchTeamInfo();
  fetchOpponents();
});

</script>

<template>
    <nav-bar></nav-bar>
    <div class="new-match">
      <h1>Nouveau match</h1>
  
      <button class="save-button" @click="saveMatch">Enregistrer</button>
  
      <div class="form-group">
            <label for="opponent">Adversaire</label>
            <select id="opponent" v-model="selectedOpponent">
            <option disabled value="">Sélectionner une équipe</option>
            <option v-for="team in apiOpponents" :key="team.id" :value="team.id">{{ team.name }}</option>
            </select>
      </div>
  
      <div class="form-group">
        <label for="activity">Activité</label>
        <select id="activity" v-model="selectedActivity">
          <option disabled value="">Sélectionner une activité</option>
          <option v-for="activity in apiActivities" :key="activity.id" :value="activity.id">{{ activity.name }}</option>
        </select>
      </div>
  
      <div class="form-group">
        <label for="startTime">Heure de début</label>
        <input type="time" id="startTime" v-model="startTime" />
      </div>
  
      <div class="scores">
        <h2>Scores finaux</h2>
        <div class="score">
          <span>{{ teamName }}</span>
          <div class="score-control">
            <input type="number" min=0 v-model.number="teamScore" />
          </div>
        </div>
        <div class="score">
          <span>{{ selectedOpponent ? apiOpponents.find(opponent => opponent.id === selectedOpponent.value)?.name : 'Adversaire inconnu' }}</span>
          <div class="score-control">
            <input type="number" min=0 v-model.number="opponentScore" />
          </div>
        </div>
      </div>
    </div>
  </template>

<style scoped>
.new-match {
  padding: 20px;
  max-width: 400px;
  margin: auto;
}
.save-button {
  float: right;
  margin-bottom: 20px;
}
.form-group {
  margin-bottom: 15px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
}
.form-group select,
.form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
.scores {
  margin-top: 30px;
}
.score {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}
.score-control {
  display: flex;
  align-items: center;
}
.score-control input {
  width: 50px;
  text-align: center;
}
.score-control button {
  background: none;
  border: 1px solid #ccc;
  width: 24px;
  height: 24px;
  line-height: 20px;
  text-align: center;
  cursor: pointer;
}
</style>
