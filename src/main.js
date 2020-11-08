import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import '@/assets/styles/app.css'
import router from './router'
axios.defaults.baseURL = 'http://localhost:8000/api/'

createApp(App).use(router).mount('#app')
