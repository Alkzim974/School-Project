<!-- src/pages/ProfilePage.vue -->

<template>
  <header class="app-header">
    <nav>
      <div>
        <h1>Zone01 - Mon Profil</h1>
      </div>
      <button @click="logout">Déconnexion</button>
    </nav>
  </header>

  <main>
    <!-- Affiche ici la page en fonction de la route -->
    <div v-if="loading">Chargement du profil...</div>
    <div v-else>
      <h2>Bienvenue, {{ user.login }}</h2>
      <p>ID : {{ user.id }}</p>
      <p><strong>Total XP :</strong> {{ totalXP }}</p>

      <h2 class="mt-6 text-xl font-semibold">Skills</h2>
      <ul class="list-disc ml-5">
        <li v-for="(skill, index) in skills" :key="index">
          {{ skill.path }} — {{ skill.amount }}
        </li>
      </ul>

      <h2 class="mt-6 text-xl font-semibold">Grades</h2>
      <ul class="list-disc ml-5">
        <li v-for="(grade, index) in grades" :key="index">
          {{ grade.name }} — {{ grade.grade }}
        </li>
      </ul>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { gql } from "graphql-request";
import { getGraphQLClient } from "@/lib/graphqlClient";

import { useRouter } from "vue-router";

const user = ref({});
const loading = ref(true);
const router = useRouter();
const totalXP = ref(0);
const skills = ref([]);
const grades = ref([]);

const query = gql`
  query GetUserProfile {
    user {
      id
      login

      transactions(where: { type: { _eq: "xp" } }) {
        amount
      }

      progresses {
        object {
          name
        }
        grade
      }

      skills: transactions {
        amount
        path
      }
    }
  }
`;

onMounted(async () => {
  try {
    const client = getGraphQLClient();
    const data = await client.request(query);

    user.value = data.user[0];
    if (!user.value) {
      throw new Error("Aucune donnée utilisateur reçue.");
    }

    // Calcul du total XP
    totalXP.value = user.value.transactions.reduce(
      (acc, t) => acc + t.amount,
      0
    );

    // Skills
    skills.value = user.value.skills.map((skill) => ({
      path: skill.path,
      amount: skill.amount,
    }));

    // Grades
    grades.value = user.value.progresses.map((p) => ({
      name: p.object?.name || "Inconnu",
      grade: p.grade,
    }));
  } catch (err) {
    error.value = err.message || "Erreur inconnue";
    console.error("Erreur lors de la récupération du profil :", err);
  } finally {
    loading.value = false;
  }
});
function logout() {
  localStorage.removeItem("jwt");
  router.push("/");
}
</script>
