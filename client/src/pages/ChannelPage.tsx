import Topbar from '@/components/Topbar'
import { Channel, Message } from '@/types/types'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAtom } from 'jotai'
import Sidebar from '@/components/Sidebar'
import { onChannelsAtom, openAtom, userAtom } from '@/state/atoms'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useViewportSize } from '@mantine/hooks'
import { useMediaQuery } from '@mantine/hooks'
import MessageInput from '@/components/MessageInput'
import MessageCard from '@/components/MessageCard'
import { useRef } from 'react'
import { useWindowEvent } from '@mantine/hooks'
import { MessageSkeleton } from '@/components/MessageSkeleton'
import { useInterval } from '@mantine/hooks'
import { useForceUpdate } from '@mantine/hooks'

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

    useWindowEvent('load', () => {
        ref.current?.scrollIntoView({
            behavior: 'smooth',
        })
    })

    useEffect(() => {
        interval.start()
        return () => interval.stop()
    })

    useEffect(() => {
        ref.current?.scrollIntoView({
            behavior: 'smooth',
        })
    }, [messages])

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
                        withCredentials: true,
                    }
                )

                setChannel(res.data)
                setMessages(res.data.messages)
            } catch (error) {
                console.log(error)
                return
            } finally {
                setLoading(false)
            }
        }

        loadChannel()
    }, [channelId, setOnChannels])

    return (
        <main className='flex bg-primary'>
            <Sidebar
                user={user}
                channels={onChannels}
                channelName={channel?.name ?? 'Loading'}
                channelDescription={channel?.description ?? 'Loading'}
                members={channel?.members ?? []}
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
                        messages != null &&
                        messages.map((message, i) =>
                            i === messages!.length - 1 ? (
                                <div key={message.id} ref={ref}>
                                    <MessageCard message={message} />
                                </div>
                            ) : (
                                <div key={message.id}>
                                    <MessageCard message={message} />
                                </div>
                            )
                        )
                    )}
                </ScrollArea>
                <MessageInput
                    loading={loading}
                    channelId={channelId!}
                    setMessages={setMessages}
                    user={user}
                />
            </div>
        </main>
    )
}
