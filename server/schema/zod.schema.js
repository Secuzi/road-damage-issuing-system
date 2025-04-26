import {z} from 'zod'

const passMinLength = Number(process.env.PASSWORD_MIN_LENGTH)

export const loginSchema = z.object({
    email: z.string().email('Invalid email').min(1, 'Email is required'),
    password: z
        .string()
        .min(
            passMinLength,
            `Password must be at least ${passMinLength} characters`
        ),
})

export const registerSchema = z.object({
    firstname: z.string().min(1, 'First name is required'),
    lastname: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email').min(1, 'Email is required'),
    password: z
        .string()
        .min(
            passMinLength,
            `Password must be at least ${passMinLength} characters`
        ),
})
