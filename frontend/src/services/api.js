import axios from 'axios'


const api = axios.create({
    baseURL: 'https://projeto-saude-backend.vercel.app/api'
    // baseURL: 'http://localhost:3333/api'
})

export default api;