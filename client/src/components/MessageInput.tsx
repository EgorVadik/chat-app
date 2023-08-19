import { Message, MessageSchema } from '@/validations/validations'
import { Message as MessageType, User } from '@/types/types'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { IoMdSend } from 'react-icons/io'
import { useToast } from '@/components/ui/use-toast'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client'

type Props = {
    channelId: string
    loading: boolean
    setMessages: Dispatch<SetStateAction<MessageType[]>>
    user: User | null
    channelName: string
}

let socket: Socket

export default function MessageInput({
    channelId,
    loading,
    setMessages,
    user,
    channelName,
}: Props) {
    const { register, handleSubmit, reset } = useForm<Message>({
        resolver: zodResolver(MessageSchema),
    })
    const { toast } = useToast()
    const [usersTyping, setUsersTyping] = useState<string[]>([])

    useEffect(() => {
        socket = io(import.meta.env.VITE_SERVER_URL as string, {
            withCredentials: true,
        })

        return () => {
            socket.disconnect()
            socket.close()
        }
    }, [channelId])

    useEffect(() => {
        if (!socket) return

        socket.on('connect', () => {
            socket.emit('join-channel', channelId)
        })

        socket.on('receive-message', (message: MessageType) => {
            setMessages((prev) => [...prev, message])
        })

        socket.on('delete-message', (messageId: string) => {
            setMessages((prev) =>
                prev.filter((message) => message.id !== messageId)
            )
        })

        socket.on('receive-user-stop-typing', (username: string) => {
            setUsersTyping((prev) => prev.filter((user) => user !== username))
        })

        socket.on('receive-user-typing', (username: string) => {
            setUsersTyping((prev) => [...prev, username])
        })

        return () => {
            socket.disconnect()
            socket.close()
            socket.off('receive-message')
            socket.off('delete-message')
            socket.off('receive-user-typing')
        }
    }, [channelId, setMessages])

    const onSubmit = async (data: Message) => {
        if (!socket || !socket.connected) {
            toast({
                title: 'Error',
                description: 'Unable to connect to server',
            })
            return
        }

        const randomUUID = crypto.randomUUID()
        reset()

        try {
            const placeholderMessage = {
                channelId,
                content: data.content,
                id: randomUUID,
                // isSending: true,
                user: {
                    id: user?.id ?? '',
                    name: user?.name ?? '',
                    photo: user?.photo ?? '',
                },
                date: new Date().toISOString().split('T')[0],
                userId: user?.id ?? '',
                createdAt: new Date(),
            }
            setMessages((prev) => [...prev, placeholderMessage])

            socket.emit('send-message', placeholderMessage, channelId)
            socket.emit('user-stop-typing', { channelId, username: user?.name })
            setUsersTyping((prev) => prev.filter((u) => u !== user?.name))

            const res = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/message`,
                { ...data, channelId },
                {
                    withCredentials: true,
                }
            )

            setMessages((prev) =>
                prev.map((message) =>
                    message.id === randomUUID
                        ? {
                              ...res.data,
                              isSending: false,
                          }
                        : message
                )
            )

            socket.emit('send-notification', {
                channelId,
                channelName,
                content: data.content,
                createdAt: res.data.createdAt,
                username: res.data.user.name,
            })
        } catch (error) {
            socket.emit('delete-message', randomUUID, channelId)
            setMessages((prev) =>
                prev.filter((message) => message.id !== randomUUID)
            )

            if (error instanceof AxiosError) {
                switch (error.response?.status) {
                    case 400:
                        toast({
                            title: 'Invalid Message Format',
                            description: 'Message must be between 1 and 2000',
                        })
                        break

                    case 401:
                        toast({
                            title: 'Unauthorized - message not sent',
                            description:
                                'You must be logged in to send messages',
                        })
                        break

                    default:
                        toast({
                            title: 'Something went wrong',
                            description: 'Message not sent',
                        })
                        break
                }
            }
        }
    }

    return (
        <div className='relative'>
            {usersTyping.length > 0 && (
                <div className='absolute lg:left-10 left-5 animate-pulse'>
                    <p className='text-medium-gray text-sm'>
                        {usersTyping.join(', ')}{' '}
                        {usersTyping.length === 1 ? 'is' : 'are'} typing...
                    </p>
                </div>
            )}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='relative flex items-center justify-center py-6 lg:px-10 px-5'
            >
                <input
                    {...register('content', {
                        onChange(e) {
                            if (e.target.value.trim().length === 0) {
                                socket.emit('user-stop-typing', {
                                    channelId,
                                    username: user?.name,
                                })
                                setUsersTyping((prev) =>
                                    prev.filter((u) => u !== user?.name)
                                )
                                return
                            }
                            if (usersTyping.includes(user!.name)) return
                            setUsersTyping((prev) => [...prev, user!.name])

                            socket.emit('send-user-typing', {
                                channelId,
                                username: user?.name,
                            })
                        },
                    })}
                    type='text'
                    className={`w-full py-3 bg-search-bar rounded-lg px-4 text-light-gray outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200`}
                    placeholder='Type a message here'
                    disabled={loading}
                    autoComplete='off'
                />
                <button
                    type='submit'
                    className='absolute lg:right-12 right-7 bg-blue-btn p-2 rounded-lg duration-200 hover:opacity-80'
                    disabled={loading}
                >
                    <IoMdSend className='text-white text-xl' />
                </button>
            </form>
        </div>
    )
}
