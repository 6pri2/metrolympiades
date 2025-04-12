<template>
    <form @submit.prevent="handleSubmit" class="register-form">
      <h2>Inscription</h2>
      <input v-model="form.username" type="text" placeholder="Nom d'utilisateur" required />
      <input v-model="form.teamName" type="text" placeholder="Nom d'équipe" required />
      <input v-model="form.email" type="email" placeholder="Email" required />
      <input v-model="form.password" type="password" placeholder="Mot de passe" required />
      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'En cours...' : 'J\'inscris mon équipe' }}
      </button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
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
          teamName: '',  
          email: '',
          password: ''
        },
        isLoading: false,
        errorMessage: '',
        successMessage: ''
      };
    },
    methods: {
      async handleSubmit() {
        this.isLoading = true;
        this.errorMessage = '';
        this.successMessage = '';
        
        try {
          const response = await fetch('http://localhost:3000/auth/register', { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.form)
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || 'Erreur lors de l\'inscription');
          }

          this.successMessage = 'Inscription réussie !';
          console.log('Réponse de l\'API:', data);
          localStorage.setItem('authToken', data.token);
          this.$router.push('/');
          
        } catch (error) {
          console.error('Erreur:', error);
          this.errorMessage = error.message || 'Une erreur est survenue';
        } finally {
          this.isLoading = false;
        }
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

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .login-link {
    margin-top: 10px;
    font-size: 14px;
  }

  .error-message {
    color: red;
    font-size: 14px;
  }

  .success-message {
    color: green;
    font-size: 14px;
  }
  </style>