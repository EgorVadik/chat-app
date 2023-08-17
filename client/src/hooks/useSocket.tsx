import { Message } from '@/types/types'
import { useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client'

type options = {
    channelId: string
    content: string
}

export default function useSocket({ channelId, content }: options) {
    const [socket, setSocket] = useState<Socket>()

    useEffect(() => {
        const newSocket = io(import.meta.env.VITE_SERVER_URL as string, {
            withCredentials: true,
        })
        setSocket(newSocket)

        return () => {
            newSocket.disconnect()
            newSocket.close()
        }
    }, [])

    useEffect(() => {
        if (!socket) return

        socket.on('connect', () => {
            console.log('connected')
        })

        socket.emit('join-channel', channelId)

        socket.on('send-message', (message: Message) => {
            console.log(message)
        })

        return () => {
            socket.disconnect()
            socket.close()
        }
    }, [socket, channelId, content])

    return socket
}
