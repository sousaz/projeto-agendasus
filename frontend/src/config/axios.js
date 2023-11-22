import axios from '../services/api'

axios.interceptors.request.use(
    config => {
        config.headers.Authorization = localStorage.getItem('token')
        return config
    },
    error => Promise.reject(error)
)

export default axios