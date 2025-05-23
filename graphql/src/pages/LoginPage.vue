<template>
  <header class="app-header">
    <div>
      <h1>Zone01 - Accueil</h1>
    </div>
  </header>

  <main>
    <div class="p-8 max-w-md mx-auto">
      <h2 class="text-2xl font-bold mb-4">Se connecter</h2>
      <form @submit.prevent="handleLogin">
        <input
          v-model="identifier"
          placeholder="Email ou Username"
          class="input"
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="Mot de passe"
          class="input mt-2"
          required
        />
        <button class="btn mt-4" :disabled="loading">
          {{ loading ? "Connexion..." : "Se connecter" }}
        </button>
        <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
      </form>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const identifier = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);
const router = useRouter();

async function handleLogin() {
  loading.value = true;
  error.value = "";
  try {
    const credentials = btoa(`${identifier.value}:${password.value}`);
    const res = await fetch("https://zone01normandie.org/api/auth/signin", {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    });

    if (!res.ok) {
      throw new Error("Identifiants invalides");
    }

    const token = await res.json();
    localStorage.setItem("jwt", token);
    router.push("/profile");
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
}
.btn {
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
}
</style>
