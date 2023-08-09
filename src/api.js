import axios from 'axios'

const api = axios.create({
  baseURL: 'https://tnzcreationsinventory.up.railway.app/api', // Your backend API URL
  withCredentials: true, // Include cookies in the request
})

export default api
