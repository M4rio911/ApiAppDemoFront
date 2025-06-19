<template>
<div class="navbar navbar-expand-lg navbar-dark">
  <div class="container-fluid py-3">
    <h4 class="pe-4">LIBRARY</h4>
    
    <div class="d-flex flex-wrap align-items-center flex-grow-1">
      <button class="nav-link" @click="redirect('/')">HOME</button>
      <button class="nav-link" @click="redirect('/Books')">BOOKS</button>
      <button class="nav-link" @click="redirect('/Borrowers')">BORROWERS</button>
      <button class="nav-link" @click="redirect('/Categories')">CATEGORIES</button>
      <button class="nav-link" @click="redirect('/Authors')">AUTHORS</button>
    </div>

    <div class="d-flex align-items-center ms-auto">
      <div v-if="!!isAuth">
        <span class="h6 mb-0 me-3">Logged as: <b>{{ userLogin }}</b></span>
        <button class="btn btn-sm btn-outline-danger" @click="logout">LOGOUT</button>
      </div>
      <div v-else>
        <button class="btn btn-md btn-outline-light" @click="redirect('/Login')">LOGIN</button>
      </div>
    </div>
  </div>
</div>

</template>

<script>
export default {
  computed: {
    isAuth() {
      return this.$store.getters['auth/UserIsAuthenticated'];
    },
    userLogin() {
      return this.$store.getters['auth/UserLogin'];
    }
  },
  methods: {
    redirect(to) {
      this.$router.push(to);
    },
    logout() {
      this.$store.dispatch('auth/Logout');
      this.$router.push('/Login');
    }
  }
};
</script>

<style scoped>

a{
  color: white;
}

h2{
  color: white;
}

h4{
  color: rgb(185, 130, 11)
}

.navbar {
  border-bottom: 2px solid white;
  position: fixed; /* Przyklejony do góry */
  top: 0;
  left: 0;
  width: 100%;
  background: #333;
  color: white;
  padding: 8px;
  text-align: center;
  z-index: 1000; /* Żeby był nad innymi elementami */
}

.nav-link {
  color: white !important;
  font-size: 100% !important;
  font-weight: 500 !important;
  margin: 0 0.7rem !important;

  border: 2px solid white;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 0.4rem 1.2rem;
  background-color: transparent;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.nav-link:hover {
  background-color: #bd8d0a;
  color: #fff;
  transform: translateY(-2px);
  transform:scale(1.1);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.nav-link:active {
  transform: scale(0.9);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}
</style>
