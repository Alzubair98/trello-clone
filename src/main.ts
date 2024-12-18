import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import localStoragePlugin from './plugins/pinia/localStorage'

const app = createApp(App)
const pinia = createPinia()

pinia.use(localStoragePlugin)
app.use(pinia)

app.mount('#app')
