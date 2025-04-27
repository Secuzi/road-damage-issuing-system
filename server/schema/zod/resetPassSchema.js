import {z} from 'zod'

const passMinLength = Number(process.env.PASSWORD_MIN_LENGTH)
const otpLength = Number(process.env.OTP_LENGTH)

const resetPasswordSchema = z.object({
    email: z.string().trim().email('Invalid email').min(1, 'Email is required'),
    newPassword: z
        .string()
        .trim()
        .min(
            passMinLength,
            `Password must be at least ${passMinLength} characters`
        ),
    otp: z
        .string()
        .trim()
        .length(otpLength, `OTP must be exactly ${otpLength} characters`),
})

export default resetPasswordSchema
