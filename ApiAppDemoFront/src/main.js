import { createApp } from 'vue'

import App from './App.vue'
import store from './store/index.js'
import router from './router'
import ApiService from './utils/api.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap'; 
import './assets/main.css'

const app = createApp(App)

app.use(store);
app.use(router)

app.mixin({
    mounted() {
      if (!this.$api) {
        const token = localStorage.getItem('token');
        this.$api = new ApiService(token);
        }
    }
});

app.mount('#app')
