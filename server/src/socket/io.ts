import passport from '../passport/passport'
import { server, sessionConfig } from '../app'
import { Server } from 'socket.io'

export default () => {
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:5173',
            credentials: true,
        },
    })

    const wrap = (middleware: any) => (socket: any, next: any) =>
        middleware(socket.request, {}, next)

    io.use(wrap(sessionConfig))
    io.use(wrap(passport.initialize()))
    io.use(wrap(passport.session()))

    io.use((socket, next) => {
        if (socket.request.user) {
            next()
        } else {
            next(new Error('unauthorized'))
        }
    })

    io.on('connection', (socket) => {
        console.log('a user connected ', socket.rooms)

        socket.on('join-channel', (channelId) => {
            socket.join(channelId)
            console.log('joined channel', channelId)
        })

        socket.on('leave-channel', (channelId) => {
            socket.leave(channelId)
            console.log('left channel', channelId)
        })

        socket.on('send-message', (message, channelId) => {
            socket.to(channelId).emit('receive-message', message)
        })

        socket.on('delete-message', (messageId, channelId) => {
            socket.to(channelId).emit('delete-message', messageId)
        })

        socket.on('disconnect', () => {
            console.log('user disconnected')
        })
    })
}
