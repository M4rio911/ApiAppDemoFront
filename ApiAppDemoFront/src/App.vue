<template>
  <div>
      <NavBar/>

    <header>
      
      <div class="wrapper">
        <h1 class="text-2xl font-bold">Moja Biblioteka</h1>
        
        <nav>
          <RouterLink to="/">Lista książek</RouterLink>
          <RouterLink to="/add">Dodaj książkę</RouterLink>
        </nav>
      </div>
    </header>
    
    <main class="p-4">
      <RouterView />
    </main>
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue';
export default {
  components: {
    NavBar
  }
}
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
  background-color: #8b8b8b;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
}

.logo {
  margin-right: 1rem;
}

.wrapper {
  display: flex;
  flex-direction: column;
}

nav {
  margin-top: 0.5rem;
}

nav a {
  margin-right: 1rem;
  text-decoration: none;
  color: #2c3e50;
  font-weight: bold;
}

nav a.router-link-exact-active {
  color: #42b983;
}

main {
  padding: 2rem;
}
</style>