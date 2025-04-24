import 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
)
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

import authRoute from './routes/auth.routes.js'
app.use('/api/auth', authRoute) //http://localhost:3000/api/auth

const port = process.env.PORT || 3000
app.listen(port)
