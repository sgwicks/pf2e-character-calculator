import axios from 'axios'
import { logout, refresh } from './auth'
import { globalRouter } from '@/routes/globalRouter'
import LaravelValidationError from '@/errors/LaravelValidationError'

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

    if (error?.response) {
      const data = error.response.data
      if (data?.message === 'The given data was invalid.') {
        throw new LaravelValidationError(data.errors)
      }

      throw error.response
    }
    throw error
  }
)

export default client
