// import './assets/main.css'
import './assets/style.css'
import "@fortawesome/fontawesome-free/css/all.min.css";

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
