import mongoose from "mongoose";

// User: {_id, first name, lastname, email, password, verificationOtp,
//     verificationOtpExpireAt, resetPasswordOtp,resetPasswordOtpExpireAt, avatar, role, isAccountVerified}

const passwordMinLength = Number(process.env.PASSWORD_MIN_LENGTH);

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
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: passwordMinLength,
  },
  isAccountVerified: {
    type: Boolean,
    default: false,
  },
  verificationOtp: {
    type: String,
    default: "",
  },
  verificationOtpExpireAt: {
    type: Number,
    default: 0,
  },
  resetPasswordOtp: {
    type: String,
    default: "",
  },
  resetPasswordOtpExpireAt: {
    type: Number,
    default: 0,
  },
  avatar: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

export default userSchema;
