import axios from "axios";
const api = axios.create({
    baseURL: import.meta.env.VITE_REACT_API_URL, // Your backend API URL
    withCredentials: true, // Include cookies in the request
});

export default api;
