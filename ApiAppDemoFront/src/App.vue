<template>
  <div class="body">
    <NavBar/>
    <BaseCard class="baseCard">
      <RouterView />
    </BaseCard>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import BaseCard from './components/BaseCard.vue';
export default {
  components: {
    NavBar,
    BaseCard
  }
}
</script>

<style>

html, body, #app {
  height: 100%;
  margin: 0;
}

.body {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100vw;
}

#app{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  
  min-height: 100vh;
  min-width: 100vw;
  
  background-color: #292420;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;

  display: flex;
  flex-direction: column;
}
</style>

<style scoped>
.baseCard{
  align-items: center;
  margin-top: 12vh;
}
</style>
