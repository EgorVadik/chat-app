import passport from '../passport/passport'
import { server, sessionConfig } from '../app'
import { Server } from 'socket.io'

export default () => {
    const io = new Server(server, {
        cors: {
            origin: [
                'https://chat-app-egorvadik.vercel.app',
                'http://localhost:5173',
            ],
            credentials: true,
        },
    })

    const wrap = (middleware: any) => (socket: any, next: any) =>
        middleware(socket.request, {}, next)

    io.use(wrap(sessionConfig))
    io.use(wrap(passport.initialize()))
    io.use(wrap(passport.session()))

    io.of('/channels').use(wrap(sessionConfig))
    io.of('/channels').use(wrap(passport.initialize()))
    io.of('/channels').use(wrap(passport.session()))

    io.use((socket, next) => {
        if (socket.request.user) {
            next()
        } else {
            next(new Error('unauthorized'))
        }
    })
    io.of('/channels').use((socket, next) => {
        if (socket.request.user) {
            next()
        } else {
            next(new Error('unauthorized'))
        }
    })

    io.on('connection', (socket) => {
        socket.on('join-channel', (channelId) => {
            socket.join(channelId)
        })

        socket.on('send-message', (message, channelId) => {
            socket.to(channelId).emit('receive-message', message)
        })

        socket.on('delete-message', (messageId, channelId) => {
            socket.to(channelId).emit('delete-message', messageId)
        })

        socket.on('send-notification', (data) => {
            io.of('/channels')
                .to(data.channelId)
                .emit('receive-notification', data)
        })

        socket.on('send-user-typing', (data) => {
            socket.to(data.channelId).emit('receive-user-typing', data.username)
        })

        socket.on('user-stop-typing', (data) => {
            socket
                .to(data.channelId)
                .emit('receive-user-stop-typing', data.username)
        })

        socket.on('disconnect', () => {
            socket.rooms.forEach((room) => {
                socket.leave(room)
            })
        })
    })

    io.of('/channels').on('connection', (socket) => {
        socket.on('join-channel-notification', (channelId) => {
            socket.join(channelId)
        })

        socket.on('disconnect', () => {
            socket.rooms.forEach((room) => {
                socket.leave(room)
            })
        })
    })
}
