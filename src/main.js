// import './assets/main.css'
import './assets/style.css'
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'vue-select/dist/vue-select.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vSelect from 'vue-select'

import App from './App.vue'
import router from './router'
const pinia = createPinia()
const app = createApp(App)
app.component('v-select', vSelect)
app.use(pinia)
app.use(router)
app.mount('#app')
