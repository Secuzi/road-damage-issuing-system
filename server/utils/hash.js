import bcrypt from 'bcrypt'

export const hashPassword = async (password) => await bcrypt.hash(password, 10)
export const isPasswordMatch = async (password, hash) =>
    await bcrypt.compare(password, hash)
