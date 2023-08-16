import 'dotenv/config'
import express from 'express'
import cors from 'cors'
const app = express()
const port = 3000
app.use(
    cors({
        origin: 'http://localhost:5173',
    })
)

import { router as authRouter } from './routes/auth'
app.use('/api/auth', authRouter)

app.listen(process.env.PORT ?? port, () =>
    console.log(`Listening on port ${port}!`)
)
