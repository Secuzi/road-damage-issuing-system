import {z} from 'zod'

export const loginSchema = z.object({
    email: z.string().trim().email('Invalid email').min(1, 'Email is required'),
    password: z.string().trim().min(1, 'Password is required'),
})

export const registerSchema = z.object({
    username: z.string().trim().min(1, 'Username is required'),
    email: z.string().trim().email('Invalid email').min(1, 'Email is required'),
    password: z.string().trim().min(1, 'Password is required'),
})
