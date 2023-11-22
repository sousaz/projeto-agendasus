import axios from 'axios'


const api = axios.create({
    baseURL: 'https://projeto-saude-backend.vercel.app/api'
})

export default api;