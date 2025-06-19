<template>
    <div class="px-5">
      <h2 class="fw-bold mb-2 text-uppercase">Login in to library</h2>

      <div class="text-start mx-1">
          <p class="text-dark-50 m-0">Login</p>
      </div>
      <div data-mdb-input-init class="form-outline form-dark mb-4">
        <input type="login" class="form-control form-control-lg" placeholder="Login" v-model="login"/>
      </div>

      <div class="text-start mx-1">
          <p class="text-dark-50 m-0">Password</p>
      </div>
      <div data-mdb-input-init class="form-outline form-dark mb-4">
        <input type="password" class="form-control form-control-lg" placeholder="Password" v-model="password"/>
      </div>

      <button class="btn btn-outline-success btn-lg px-5 mt-2" @click="LoginMe">Login</button>

      <div v-if="this.error != null">
        <p style="color: red;">{{ this.error }}</p>
      </div>

    </div>
</template>

<script>

export default {
    data() {
        return {
            login: '',
            password: '',
            error: null
        };
    },
    methods: {
        async LoginMe() {
            try {

                const response = await this.$api.post('Auth/login', {
                    username: this.login,
                    password: this.password,
                });

                if (!response.ok) 
                    throw new Error('Logowanie nie powiodło się');


                const token = response.token;

                if (!token) {
                    console.error('No token error!');
                    return;
                }

                localStorage.setItem('token', token);
                this.dispatchToStore(this.login);
                
                this.$router.push('/');

            } catch (error) {
                this.error = 'Invalid credentials';
                console.error(' Error:', error.message);
            }
        },
        dispatchToStore(userLogin){
            this.$store.dispatch('auth/Login', {userLogin});
        },
    }
}

</script>