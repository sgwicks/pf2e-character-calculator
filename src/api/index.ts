import axios from 'axios'
import { logout, refresh } from './auth'
import { globalRouter } from '@/routes/globalRouter'

const client = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL
})

client.interceptors.request.use(async (config) => {
  const freshToken = await refresh()

  config.headers.Authorization = `Bearer ${freshToken}`

  return config
})

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      globalRouter.router?.push('/')
      logout()
    }
  }
)

export default client
