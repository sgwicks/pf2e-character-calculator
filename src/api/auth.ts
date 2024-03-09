import axios from 'axios'
import Cookies from 'js-cookie'

import { globalRouter } from '@/routes/globalRouter'

const authClient = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL + '/auth'
})

authClient.interceptors.response.use(
  (response) => {
    if (typeof response.headers.getAuthorization == 'function') {
      const token = response.headers.getAuthorization()
      if (token) {
        Cookies.set('bearer', token.toString())
      }
    }

    return response
  },
  (error) => {
    if (error.response.status === 401) {
      globalRouter.router?.push('/')
    }
  }
)

const login = (username: string, password: string) => {
  return authClient.post(
    '/login',
    {},
    {
      auth: {
        username,
        password
      }
    }
  )
}

const refresh = async () => {
  const token = Cookies.get('bearer')

  if (!token) throw 'No token stored'

  const response = await authClient.post(
    '/refresh',
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  )

  if (typeof response.headers.getAuthorization == 'function') {
    const token = response.headers.getAuthorization()
    if (token) {
      Cookies.set('bearer', token.toString())
      return token.toString()
    }
  }
}

const logout = async () => {
  const token = Cookies.get('bearer')
  authClient.post('/logout', {}, { headers: { Authorization: token } })
  Cookies.remove('bearer')
  globalRouter.router?.push('/')
}

export { login, refresh, logout }
