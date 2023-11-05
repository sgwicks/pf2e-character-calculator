import client from '.'

const login = (username: string, password: string) => {
  return client.post(
    '/auth/login',
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
