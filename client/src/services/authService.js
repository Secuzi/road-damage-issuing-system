import axios from '../utils/axios'

export const login = async (userData) => {
    const {data} = await axios.post('/auth/login', userData)
    return data
}

export const
