<template>
    <form @submit.prevent="handleSubmit" class="register-form">
      <h2>Inscription</h2>
      <input v-model="form.username" type="text" placeholder="Nom d'utilisateur" required />
      <input v-model="form.team" type="text" placeholder="Nom d'équipe" required />
      <input v-model="form.email" type="email" placeholder="Email" required />
      <input v-model="form.password" type="password" placeholder="Mot de passe" required />
      <button type="submit">J'inscris mon équipe</button>
      <p class="login-link">
        Déjà inscrit ? <router-link to="/login">Me connecter</router-link>
      </p>
    </form>
  </template>
  
  <script>
  export default {
    name: 'RegisterForm',
    data() {
      return {
        form: {
          username: '',
          team: '',
          email: '',
          password: ''
        }
      };
    },
    methods: {
      handleSubmit() {
        console.log("Formulaire soumis :", this.form);
        // Tu pourras envoyer ça vers une API plus tard
      }
    }
  };
  </script>
  
  <style scoped>
  .register-form {
    display: flex;
    flex-direction: column;
    width: 300px;
    margin: 0 auto;
    gap: 10px;
    text-align: center;
  }
  
  input {
    padding: 8px;
    border: 1px solid #aaa;
    border-radius: 4px;
  }
  
  button {
    padding: 8px;
    border: 1px solid #000;
    border-radius: 6px;
    background-color: white;
    cursor: pointer;
  }
  
  .login-link {
    margin-top: 10px;
    font-size: 14px;
  }
  </style>
  