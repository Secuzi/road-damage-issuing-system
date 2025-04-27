import createError from 'http-errors'
import {clearCookie, createCookie} from '../utils/cookie.js'
import {minutesToMilliseconds, daysToMilliseconds} from '../utils/expiry.js'
import {generateAccessToken, generateRefreshToken} from '../utils/token.js'
import {hashPassword, isPasswordMatch} from '../utils/hash.js'
import {generateOtp} from '../utils/generateOtp.js'
import {sendEmail} from '../utils/mail.js'
import {
    fetchUserById,
    fetchUserByEmail,
    insertUser,
} from '../services/user.service.js'

export const login = async (req, res, next) => {
    const user = await fetchUserByEmail(req.body.email)
    if (!user) return next(createError(404, 'User not found'))

    const isPasswordMatched = await isPasswordMatch(
        req.body.password,
        user.password
    )
    if (!isPasswordMatched) return next(createError(400, 'Invalid password'))

    const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
    }

    const accessToken = generateAccessToken(
        payload,
        process.env.ACCESS_TOKEN_SECRET
    )
    const refreshToken = generateRefreshToken(
        payload,
        process.env.REFRESH_TOKEN_SECRET
    )

    createCookie(res, 'accessToken', accessToken, minutesToMilliseconds(15))
    createCookie(res, 'refreshToken', refreshToken, daysToMilliseconds(7))

    res.status(200).json({
        message: 'Login successful',
    })
}

export const register = async (req, res, next) => {
    const {email, password} = req.body

    const isUserExist = await fetchUserByEmail(email)
    if (isUserExist) return next(createError(400, 'User already exists'))

    const hashedPassword = await hashPassword(password)
    req.body.password = hashedPassword
    await insertUser(req.body)

    const user = await fetchUserByEmail(email, {
        email: true,
        role: true,
    })

    const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
    }

    const accessToken = generateAccessToken(
        payload,
        process.env.ACCESS_TOKEN_SECRET
    )
    const refreshToken = generateRefreshToken(
        payload,
        process.env.REFRESH_TOKEN_SECRET
    )
    createCookie(res, 'accessToken', accessToken, minutesToMilliseconds(15))
    createCookie(res, 'refreshToken', refreshToken, daysToMilliseconds(7))

    res.status(201).json({message: 'User created successfully'})
}

export const logout = async (req, res) => {
    clearCookie(res, 'accessToken')
    clearCookie(res, 'refreshToken')

    return res.status(200).json({message: 'Logged out'})
}

export const sendVerification = async (req, res, next) => {
    const {id} = req.user

    const user = await fetchUserById(id)
    if (!user) {
        return next(createError(404, 'User could not be found'))
    }

    if (user.isAccountVerified) {
        return next(createError(404, 'Account has already been verified'))
    }

    const otp = generateOtp()

    user.verificationOtp = otp

    user.verificationOtpExpireAt = Date.now() + minutesToMilliseconds(1)
    await user.save()

    const output = await sendEmail(
        user.email,
        'Account Verification',
        `Thank you for verifying your account. Your one-time password (OTP) is: ${otp}`,
        next
    )
    return res.status(200).json(output)
}

export const verifyEmail = async (req, res, next) => {
    const {otp} = req.body
    const {id} = req.user

    if (!otp) {
        return next(createError(400, 'OTP must be supplied.'))
    }

    const user = await fetchUserById(id)
    if (!user) {
        return next(createError(404, 'User could not be found'))
    }

    if (user.verificationOtp !== otp || user.verificationOtp === '') {
        return next(createError(404, 'Invalid OTP'))
    }

    if (user.verificationOtpExpireAt < Date.now()) {
        return next(createError(404, 'OTP has expired'))
    }

    user.isAccountVerified = true
    user.verificationOtp = ''
    user.verificationOtpExpireAt = 0
    await user.save()

    return res.status(200).json({message: 'Account verified'})
}

export const sendResetPasswordOtp = async (req, res, next) => {
    const {email} = req.body

    if (!email) {
        return next(createError(400, 'Email must not be empty'))
    }

    const user = await fetchUserByEmail(email)
    if (!user) {
        return next(createError(400, 'User not found'))
    }

    const otp = generateOtp()

    user.resetPasswordOtp = otp
    user.resetPasswordOtpExpireAt = Date.now() + minutesToMilliseconds(1)
    await user.save()

    const output = await sendEmail(
        user.email,
        'Reset Password OTP',
        `Thank you for requesting a password reset. Your one-time password (OTP) is: ${otp}

        Please enter this code to verify your identity and set a new password. This OTP is valid for a limited time.
  
        If you didn't request this reset, please secure your account immediately.`,
        next
    )

    return res.json(output)
}

export const resetPassword = async (req, res, next) => {
    const {email, newPassword, otp} = req.body

    if (!email || !newPassword || !otp) {
        return next(
            createError(400, 'Email, New Password, and OTP must be required')
        )
    }

    const user = await fetchUserByEmail(email)

    if (!user) {
        return next(createError(400, 'User not found'))
    }
    if (user.resetPasswordOtp !== otp || user.resetPasswordOtp === '') {
        return next(createError(400, 'Invalid OTP'))
    }
    if (user.resetPasswordOtpExpireAt < Date.now()) {
        return next(createError(404, 'OTP has expired'))
    }

    user.password = await hashPassword(newPassword)
    user.resetPasswordOtp = ''
    user.resetPasswordOtpExpireAt = 0
    await user.save()

    return res.json({message: 'Your password has been successfully reset'})
}
