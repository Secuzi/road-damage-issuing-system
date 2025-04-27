import {z} from 'zod'

const passMinLength = Number(process.env.PASSWORD_MIN_LENGTH)

const loginSchema = z.object({
    email: z.string().trim().email('Invalid email').min(1, 'Email is required'),
    password: z
        .string()
        .trim()
        .min(
            passMinLength,
            `Password must be at least ${passMinLength} characters`
        ),
})

export default loginSchema
