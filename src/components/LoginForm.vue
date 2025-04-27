<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const password = ref("");
const isLoading = ref(false);
const errorMessage = ref("");

const isFormValid = computed(() => email.value.trim() && password.value.trim());

async function login() {
  isLoading.value = true;
  errorMessage.value = "";

  try {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || "Email ou mot de passe incorrect");

    localStorage.setItem("authToken", data.token);
    localStorage.setItem("user", JSON.stringify(data));
    
    
    router.push("/leaderboard");

  } catch (err) {
    errorMessage.value = err.message || "Erreur lors de la connexion";
  } finally {
    isLoading.value = false;
  }
}

function continueAsGuest() {
  router.push("/leaderboard");
}
</script>

<template>
  <form @submit.prevent="login" class="login-form">
    <h1>Connexion</h1>
    
    <input
      type="email"
      id="email"
      name="email"
      autocomplete="email"
      required
      v-model="email"
      placeholder="Email"
    />
    
    <input
      type="password"
      id="password"
      name="password"
      autocomplete="current-password"
      required
      v-model="password"
      placeholder="Mot de passe"
    />
    
    <button 
      type="submit" 
      :disabled="!isFormValid || isLoading" 
      :class="{ loading: isLoading }"
    >
      {{ isLoading ? 'Connexion en cours...' : 'Connexion' }}
    </button>

    <button 
      type="button" 
      @click="continueAsGuest"
      class="guest-button"
    >
      Continuer en invité
    </button>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    
    <p class="register-link">
      Pas encore de compte ? <router-link to="/register">Je m'inscris</router-link>
    </p>
  </form>
</template>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
  gap: 15px;
  text-align: center;
}

.login-form h1 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.login-form input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}

.login-form button {
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-form button:hover {
  background-color: #3aa876;
}

.login-form button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.login-form button.loading {
  position: relative;
  padding-right: 35px;
}

.login-form button.loading::after {
  content: "";
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 15px;
  height: 15px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: translateY(-50%) rotate(360deg); }
}

.error-message {
  color: #ff4444;
  font-size: 0.9rem;
  margin-top: 10px;
}

.register-link {
  margin-top: 1rem;
  font-size: 0.9rem;
}

.register-link a {
  color: #42b983;
  text-decoration: none;
  font-weight: 500;
}

.guest-button {
  padding: 10px;
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.guest-button:hover {
  background-color: #e0e0e0;
}
</style>