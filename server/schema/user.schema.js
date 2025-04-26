import mongoose from 'mongoose'

// User: {_id, first name, lastname, email, password, verificationOtp,
//     verificationOtpExpireAt, resetPasswordOtp,resetPasswordOtpExpireAt, avatar, role, isAccountVerified}

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: process.env.PASSWORD_MIN_LENGTH,
    },
    isAccountVerified: {
        type: Boolean,
        default: false,
    },
    verificationOtp: {
        type: String,
    },
    verificationOtpExpireAt: {
        type: Date,
    },
    resetPasswordOtp: {
        type: String,
    },
    resetPasswordOtpExpireAt: {
        type: Date,
    },
    avatar: {
        type: String,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
})

export default userSchema
