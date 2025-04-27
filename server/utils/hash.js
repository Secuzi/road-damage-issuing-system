import bcrypt from 'bcrypt'

const salt = Number(process.env.PASSWORD_HASH_SALT)

export const hashPassword = async (password) =>
    await bcrypt.hash(password, salt)
export const isPasswordMatch = async (password, hash) =>
    await bcrypt.compare(password, hash)
