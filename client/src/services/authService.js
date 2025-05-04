import axios from '../utils/axios'
const API_URL = import.meta.env.VITE_BACKEND_URL

export const login = async (userData) => {
    const {data} = await axios.post(`${API_URL}/api/auth/login`, userData)
    return data
}

export const register = async (userData) => {
    const {data} = await axios.post(`${API_URL}/api/auth/register`, userData)
    return data
}

export const logout = async () => {
    const {data} = await axios.get('/auth/logout')
    return data
}
