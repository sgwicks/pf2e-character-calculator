import axios from 'axios'

const getUser = () => {
  return axios.get('http://localhost:8000/api/v1/users/1')
}

export { getUser }
