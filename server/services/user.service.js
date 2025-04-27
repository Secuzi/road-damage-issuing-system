import User from '../models/user.model.js'

export const fetchUsers = async () => await User.find()

export const fetchUserById = async (id) => await User.findById(id)

export const fetchUserByEmail = async (email, projection = {}) =>
    await User.findOne({email}, projection)

export const insertUser = async (user) => await User.create(user)

export const updateUserById = async (id, user) =>
    await User.findByIdAndUpdate(id, user)

export const deleteUserById = async (id) => await User.findByIdAndDelete(id)
