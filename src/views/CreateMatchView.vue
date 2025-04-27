<script setup>
import { ref, onMounted } from 'vue';
import NavBar from '@/components/NavBar.vue';

// Déclaration des variables manquantes
const selectedOpponent = ref('');
const selectedActivity = ref('');
const startTime = ref('');
const teamScore = ref(0);
const opponentScore = ref(0);

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
            <input type="number" v-model.number="teamScore" />
          </div>
        </div>
        <div class="score">
          <span>{{ selectedOpponent ? apiOpponents.find(opponent => opponent.id === selectedOpponent)?.name : 'Adversaire inconnu' }}</span>
          <div class="score-control">
            <input type="number" v-model.number="opponentScore" />
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
