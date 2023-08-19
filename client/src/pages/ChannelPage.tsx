import Topbar from '@/components/Topbar'
import { Channel, Message } from '@/types/types'
import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAtom } from 'jotai'
import Sidebar from '@/components/Sidebar'
import { membersAtom, onChannelsAtom, openAtom, userAtom } from '@/state/atoms'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
    useViewportSize,
    useMediaQuery,
    useInterval,
    useForceUpdate,
    // useWindowEvent,
} from '@mantine/hooks'
import MessageInput from '@/components/MessageInput'
import MessageCard from '@/components/MessageCard'
import { useRef } from 'react'
import { MessageSkeleton } from '@/components/MessageSkeleton'
import MessageSeparator from '@/components/MessageSeparator'
import NotInChannel from '@/components/NotInChannel'
import { useToast } from '@/components/ui/use-toast'

export default function ChannelPage() {
    const { channelId } = useParams()
    const [channel, setChannel] = useState<Channel | undefined>(undefined)
    const [messages, setMessages] = useState<Message[]>([])
    const [loading, setLoading] = useState(false)
    const [open] = useAtom(openAtom)
    const { height } = useViewportSize()
    const match = useMediaQuery('(max-width: 1024px)')
    const ref = useRef<HTMLDivElement>(null)
    const [onChannels, setOnChannels] = useAtom(onChannelsAtom)
    const [user] = useAtom(userAtom)
    const forceUpdate = useForceUpdate()
    const interval = useInterval(forceUpdate, 1000 * 60)
    const [members, setMembers] = useAtom(membersAtom)
    // const [take, setTake] = useState(50)
    // const [initialLoad, setInitialLoad] = useState(true)
    // const loadMoreRef = useRef<HTMLButtonElement>(null)
    const { toast } = useToast()

    // useWindowEvent('load', () => {
    //     ref.current?.scrollIntoView({
    //         behavior: 'smooth',
    //     })
    // })

    // useEffect(() => {
    //     setInitialLoad(true)
    // }, [channelId])

    // useEffect(() => {
    //     if (loading) return
    //     setInitialLoad(false)
    // }, [loading])

    useEffect(() => {
        interval.start()
        return () => interval.stop()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        // console.log('scrolling')
        ref.current?.scrollIntoView({
            behavior: 'smooth',
        })
    }, [messages])

    // useEffect(() => {
    //     if (loading || initialLoad) return
    //     loadMoreRef.current?.scrollIntoView({
    //         behavior: 'smooth',
    //     })
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [take, loading])

    useEffect(() => {
        const loadChannel = async () => {
            setOnChannels(false)
            setLoading(true)
            try {
                const res = await axios.get(
                    `${
                        import.meta.env.VITE_SERVER_URL
                    }/api/channel/${channelId}`,
                    {
                        // params: {
                        //     take,
                        // },
                        withCredentials: true,
                    }
                )

                setChannel(res.data)
                setMessages(res.data.messages)
                setMembers(res.data.members)
            } catch (error) {
                if (error instanceof AxiosError) {
                    switch (error.response?.status) {
                        case 404:
                            toast({
                                title: 'Channel not found',
                                description:
                                    'The channel you are looking for does not exist.',
                            })
                            break

                        default:
                            toast({
                                title: 'An error occurred',
                                description:
                                    'An error occurred while trying to load the channel.',
                            })
                            break
                    }
                }
                return
            } finally {
                setLoading(false)
            }
        }

        loadChannel()
    }, [channelId, setOnChannels, setMembers, toast])
    // }, [channelId, setOnChannels, setMembers, toast, take])

    if (!loading && !channel?.userIds.includes(user?.id ?? '')) {
        return <NotInChannel channelId={channelId!} />
    }

    return (
        <main className='flex bg-primary'>
            <Sidebar
                user={user}
                channels={onChannels}
                channelName={channel?.name ?? 'Loading'}
                channelDescription={channel?.description ?? 'Loading'}
                members={members}
                loading={loading}
            />
            <div
                data-open={open}
                className='flex flex-col lg:data-[open=true]:static data-[open=true]:fixed data-[open=false]:fixed lg:data-[open=false]:static group w-full'
            >
                <Topbar channelName={channel?.name ?? 'Loading'} />

                <ScrollArea
                    className='text-white lg:px-10 px-5'
                    style={{
                        height: height - (match ? 85 : open ? 100 : 150),
                        paddingTop: match ? 55 : open ? 60 : 0,
                    }}
                >
                    {loading ? (
                        <div className='flex flex-col gap-4'>
                            {new Array(12).fill(0).map((_, i) => (
                                <MessageSkeleton key={i} />
                            ))}
                        </div>
                    ) : (
                        <>
                            {/* <button
                                ref={loadMoreRef}
                                className={`flex m-auto mt-4 mb-2 bg-medium-gray rounded-lg px-4 py-2 font-bold text-sidebar hover:bg-sidebar hover:text-lighter-gray transition-colors duration-300 disabled:bg-medium-gray disabled:text-lighter-gray disabled:cursor-not-allowed`}
                                disabled={channel!._count!.messages <= take}
                                onClick={() => setTake((prev) => prev + 50)}
                            >
                                Load more
                            </button> */}
                            {/* <div ref={loadMoreRef} /> */}
                            {messages != null &&
                                messages.map((message, i) =>
                                    i === messages!.length - 1 ? (
                                        <div
                                            key={message.id}
                                            ref={ref}
                                            // className='bg-red-50'
                                        >
                                            <MessageCard message={message} />
                                        </div>
                                    ) : (
                                        <div key={message.id}>
                                            <MessageCard message={message} />
                                            <MessageSeparator
                                                date1={message.createdAt}
                                                date2={
                                                    messages[i + 1].createdAt
                                                }
                                            />
                                        </div>
                                    )
                                )}
                        </>
                    )}
                </ScrollArea>
                <MessageInput
                    loading={loading}
                    channelId={channelId!}
                    setMessages={setMessages}
                    user={user}
                    channelName={channel?.name ?? ''}
                />
            </div>
        </main>
    )
}
