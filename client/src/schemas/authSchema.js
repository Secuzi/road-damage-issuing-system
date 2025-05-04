import {z} from 'zod'

const minLength = Number(import.meta.env.VITE_MIN_INPUT_LENGTH)

export const loginSchema = z.object({
    email: z.string().trim().email('Invalid email').min(1, 'Email is required'),
    password: z
        .string()
        .trim()
        .min(6, `Password must be at least ${minLength} characters`),
})

export const registerSchema = z.object({
    username: z
        .string()
        .trim()
        .min(6, `Username must be at least ${minLength} characters`),
    email: z.string().trim().email('Invalid email').min(1, 'Email is required'),
    password: z
        .string()
        .trim()
        .min(6, `Password must be at least ${minLength} characters`),
})
