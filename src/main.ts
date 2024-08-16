import './assets/main.scss'

import { createApp } from 'vue'

import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'

import * as Sentry from '@sentry/vue'

import App from './App.vue'

const env = import.meta.env

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)

Sentry.init({
  app,
  dsn: env.VITE_APP_SENTRY_DSN,
  integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
  tracesSampleRate: 1,
  tracePropagationTargets: ['localhost', env.VITE_APP_BASE_URL, env.VITE_APP_WEB_URL],
  replaysSessionSampleRate: 1,
  replaysOnErrorSampleRate: 1
})

// Set up pinia plugins
const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

app.use(pinia)
app.use(router)

app.mount('#app')
