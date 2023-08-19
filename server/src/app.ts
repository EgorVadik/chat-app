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
const port = 3000

export const sessionConfig = session({
    secret: process.env.SESSION_SECRET!,
    resave: true,
    saveUninitialized: true,
    cookie: {
        // secure: process.env.NODE_ENV === 'production' ? true : false,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7 * 52,
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
        origin: 'https://chat-app-egorvadik.vercel.app',
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

server.listen(process.env.PORT ?? port, () =>
    console.log(`Listening on port ${port}!`)
)
