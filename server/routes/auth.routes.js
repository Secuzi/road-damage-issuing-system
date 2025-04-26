import express from 'express'
import validate from '../middlerwares/zodValidate.js'
import {loginSchema, registerSchema} from '../schema/zod.schema.js'
import {login, register} from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/login', validate(loginSchema), login)
router.post('/register', validate(registerSchema), register)

export default router
