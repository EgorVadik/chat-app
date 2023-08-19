import { Notification } from '@/types/types'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import io, { Socket } from 'socket.io-client'
import { useToast } from '@/components/ui/use-toast'

type options = {
    channelId: string
}

let socket: Socket

export default function useChannelSocket({ channelId }: options) {
    const { channelId: currentChannelId } = useParams()
    const { toast } = useToast()
    const navigate = useNavigate()

    useEffect(() => {
        socket = io(`${import.meta.env.VITE_SERVER_URL}/channels`, {
            withCredentials: true,
        })

        socket.on('connect', () => {
            socket.emit('join-channel-notification', channelId)
        })

        return () => {
            socket.disconnect()
            socket.close()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!socket) return

        socket.on('receive-notification', (notification: Notification) => {
            if (notification.channelId === currentChannelId) return
            toast({
                title: `${
                    notification.username
                } posted in #${notification.channelName.toUpperCase()} (Double click to go to channel)`,
                description: notification.content,
                onDoubleClick: () => {
                    navigate(`/channel/${notification.channelId}`)
                },
            })
        })

        return () => {
            socket.off('receive-notification')
        }
    }, [currentChannelId, toast, navigate])
}
