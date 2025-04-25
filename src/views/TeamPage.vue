<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';

</script>
<template>
  <div class="team-view">
    <Navbar/>

    <div class="team-container">
      <h1>Mon équipe</h1>
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
</style>
