import axios from '../utils/axios'

export const login = async (userData) => {
    const {data} = await axios.post('/auth/login', userData)
    return data
}

export const register = async (userData) => {
    const {data} = await axios.post('/auth/register', userData)
    return data
}

export const logout = async () => {
    const {data} = await axios.get('/auth/logout')
    return data
}
