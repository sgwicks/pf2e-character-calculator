import './assets/main.scss'

import { createApp } from 'vue'

import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'

import App from './App.vue'

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)

// Set up pinia plugins
const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

app.use(pinia)
app.use(router)

app.mount('#app')
