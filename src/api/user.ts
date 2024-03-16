import type { AxiosResponse } from 'axios'
import client from '.'

const signup = (name: string, email: string, password: string) => {
  return client.post('/signup', { name, email, password })
}

const fetchUser = (id: number): Promise<AxiosResponse<{ data: User }>> => {
  return client.get(`/users/${id}`)
}

export { signup, fetchUser }
