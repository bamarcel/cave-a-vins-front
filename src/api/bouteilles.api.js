import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})


// Injecte automatiquement le token JWT dans chaque requête
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
})

export const register = async (email, password) => {
    const res = await api.post('/auth/register', {email, password})
    return res.data
}

export const login = async (email, password) => {
    const res = await api.post('/auth/login', {email, password})
    return res.data
}

export const getBouteilles = async (filtres) => {
    const res = await api.get('/bouteilles', {params: filtres})
    return res.data
}

export const createBouteille = async (data) => {
    const res = await api.post('/bouteilles', data)
    return res.data
}

export const updateBouteille = async (id, data) => {
    const res = await api.put(`/bouteilles/${id}`, data)
    return res.data
}

export const uploadPhoto = async (id, file) => {
    const formData = new FormData()
    formData.append('photo', file)
    const res = await api.post(`/bouteilles/${id}/photo`, formData)
    return res.data
}