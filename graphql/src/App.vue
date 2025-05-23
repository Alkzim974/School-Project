<!-- src/App.vue -->
<template>
  <div id="app">
    <RouterView />

    <footer class="app-footer">
      <p>© 2025 - Projet Zone01 GraphQl</p>
    </footer>
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: system-ui, sans-serif;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#app h2 {
  margin-bottom: 1rem;
}

.app-header {
  background-color: #1e1e2f;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
nav {
  display: flex;
  flex-direction: row;
  align-items: center;
}
nav button {
  background-color: #3b82f6;
  color: white;

  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  margin-left: 2rem;
}
nav button:hover {
  background-color: #2563eb;
}
#app button {
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
}
#app button:hover {
  background-color: #2563eb;
}

main {
  flex: 1;
  padding: 2rem;
}

.app-footer {
  background-color: #1e1e2f;
  color: white;
  text-align: center;
  padding: 1rem;
}

.input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
}
</style>
