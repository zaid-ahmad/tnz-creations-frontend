import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/', // Your backend API URL
  withCredentials: true, // Include cookies in the request
})

export default api

// https://tnzcreationsinventory.up.railway.app/
