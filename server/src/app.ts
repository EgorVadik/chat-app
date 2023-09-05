import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import session from 'express-session'
import passport from 'passport'
import MongoStore from 'connect-mongo'
import { PrismaClient } from '@prisma/client'
import http from 'http'
import initIo from './socket/io'

export const prisma = new PrismaClient()
const app = express()
export const server = http.createServer(app)
const port = process.env.PORT ?? 3000

export const sessionConfig = session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
        // secure: process.env.NODE_ENV === 'production',
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        // sameSite: false,
        // httpOnly: false,
    },
    store: MongoStore.create({
        mongoUrl: process.env.DATABASE_URL!,
    }),
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(sessionConfig)
app.use(passport.initialize())
app.use(passport.session())
app.use(
    cors({
        origin: [
            'https://chat-app-egorvadik.vercel.app',
            'http://localhost:5173',
        ],
        credentials: true,
    })
)

initIo()

import { router as authRouter } from './routes/auth'
app.use('/api/auth', authRouter)

import { router as channelRouter } from './routes/channel'
app.use('/api/channel', channelRouter)

import { router as messageRouter } from './routes/message'
app.use('/api/message', messageRouter)

server.listen(port, () => console.log(`Listening on port ${port}!`))
