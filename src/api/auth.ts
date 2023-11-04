import axios from 'axios'

const login = (username: string, password: string) => {
  return axios.post(
    'http://localhost:8000/api/v1/auth/login',
    {},
    {
      auth: {
        username,
        password
      }
    }
  )
}

export { login }
