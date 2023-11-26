import axios from 'axios'

import Cookies from 'js-cookie'

const client = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL
})

client.interceptors.request.use((request) => {
  // TODO: Refresh auth
  const token = Cookies.get('bearer')

  if (token) {
    request.headers.Authorization = token
  }

  return request
})

client.interceptors.response.use((response) => {
  if (typeof response.headers.getAuthorization == 'function') {
    const token = response.headers.getAuthorization()
    if (token) {
      Cookies.set('bearer', token.toString())
    }
  }

  return response
})

export default client
