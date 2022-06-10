import axios from 'axios'

const instance = axios.create({
  timeout: 5000,
  withCredentials: false
})

export default instance
