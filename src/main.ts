import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
// ----------- Local Storage Plugin --------------
import localStoragePlugin from './plugins/pinia/localStorage'

// ---------- bootstrac icons ---------------------
import 'bootstrap-icons/font/bootstrap-icons.css'

const app = createApp(App)
const pinia = createPinia()

pinia.use(localStoragePlugin)
app.use(pinia)

app.mount('#app')
