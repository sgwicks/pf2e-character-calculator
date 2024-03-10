import client from '.'

const signup = (name: string, email: string, password: string) => {
  return client.post('/signup', { name, email, password })
}

export { signup }
