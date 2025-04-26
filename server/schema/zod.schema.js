import {z} from 'zod'

const passMinLength = Number(process.env.PASSWORD_MIN_LENGTH)

export const loginSchema = z.object({
    email: z.string().trim().email('Invalid email').min(1, 'Email is required'),
    password: z
        .string()
        .trim()
        .min(
            passMinLength,
            `Password must be at least ${passMinLength} characters`
        ),
})

export const registerSchema = z.object({
    firstname: z.string().trim().min(1, 'First name is required'),
    lastname: z.string().trim().min(1, 'Last name is required'),
    email: z.string().trim().email('Invalid email').min(1, 'Email is required'),
    password: z
        .string()
        .trim()
        .min(
            passMinLength,
            `Password must be at least ${passMinLength} characters`
        ),
})
