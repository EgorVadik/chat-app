import { useAtom } from 'jotai'
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import { openAtom } from '@/state/atoms'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useViewportSize } from '@mantine/hooks'
import { useMediaQuery } from '@mantine/hooks'
import MessageInput from '@/components/MessageInput'
import MessageCard from '@/components/MessageCard'
import { useMemo, useRef } from 'react'
import { useWindowEvent } from '@mantine/hooks'

export default function Home() {
    const [open] = useAtom(openAtom)
    const { height } = useViewportSize()
    const match = useMediaQuery('(max-width: 1024px)')
    const ref = useRef<HTMLDivElement>(null)

    const dummyMessages = useMemo(
        () => [
            {
                id: 1,
                user: {
                    name: 'Some user name',
                    image: 'https://i.imgur.com/8Km9tLL.png',
                },
                message: 'Some message',
                // random date
                date: new Date(
                    +new Date() - Math.floor(Math.random() * 10000000000)
                ),
            },
            {
                id: 2,
                user: {
                    name: 'Some user name',
                    image: 'https://i.imgur.com/8Km9tLL.png',
                },
                message: 'Some message',
                date: new Date(
                    +new Date() - Math.floor(Math.random() * 10000000000)
                ),
            },
            {
                id: 3,
                user: {
                    name: 'Some user name',
                    image: 'https://i.imgur.com/8Km9tLL.png',
                },
                message: 'Some message',
                date: new Date(
                    +new Date() - Math.floor(Math.random() * 10000000000)
                ),
            },
            {
                id: 4,
                user: {
                    name: 'Some user name',
                    image: 'https://i.imgur.com/8Km9tLL.png',
                },
                message: 'Some message',
                date: new Date(
                    +new Date() - Math.floor(Math.random() * 10000000000)
                ),
            },
            {
                id: 5,
                user: {
                    name: 'Some user name',
                    image: 'https://i.imgur.com/8Km9tLL.png',
                },
                message: 'Some message',
                date: new Date(
                    +new Date() - Math.floor(Math.random() * 10000000000)
                ),
            },
            {
                id: 6,
                user: {
                    name: 'Some user name',
                    image: 'https://i.imgur.com/8Km9tLL.png',
                },
                message: 'Some message',
                date: new Date(
                    +new Date() - Math.floor(Math.random() * 10000000000)
                ),
            },
            {
                id: 7,
                user: {
                    name: 'Some user name',
                    image: 'https://i.imgur.com/8Km9tLL.png',
                },
                message: 'Some message',
                date: new Date(
                    +new Date() - Math.floor(Math.random() * 10000000000)
                ),
            },
            {
                id: 8,
                user: {
                    name: 'Some user name',
                    image: 'https://i.imgur.com/8Km9tLL.png',
                },
                message: 'Some message',
                date: new Date(
                    +new Date() - Math.floor(Math.random() * 10000000000)
                ),
            },
            {
                id: 9,
                user: {
                    name: 'Some user name',
                    image: 'https://i.imgur.com/8Km9tLL.png',
                },
                message: 'Some message',
                date: new Date(
                    +new Date() - Math.floor(Math.random() * 10000000000)
                ),
            },
            {
                id: 10,
                user: {
                    name: 'Some user name',
                    image: 'https://i.imgur.com/8Km9tLL.png',
                },
                message: 'Some message',
                date: new Date(
                    +new Date() - Math.floor(Math.random() * 10000000000)
                ),
            },
            {
                id: 11,
                user: {
                    name: 'Some user name',
                    image: 'https://i.imgur.com/8Km9tLL.png',
                },
                message: 'Some message',
                date: new Date(
                    +new Date() - Math.floor(Math.random() * 10000000000)
                ),
            },
            {
                id: 12,
                user: {
                    name: 'Some user name',
                    image: 'https://i.imgur.com/8Km9tLL.png',
                },
                message: 'Some message',
                date: new Date(
                    +new Date() - Math.floor(Math.random() * 10000000000)
                ),
            },
            {
                id: 13,
                user: {
                    name: 'Some user name',
                    image: 'https://i.imgur.com/8Km9tLL.png',
                },
                message: 'Some message',
                date: new Date(
                    +new Date() - Math.floor(Math.random() * 10000000000)
                ),
            },
            {
                id: 14,
                user: {
                    name: 'Some user name',
                    image: 'https://i.imgur.com/8Km9tLL.png',
                },
                message: 'Some message',
                date: new Date(
                    +new Date() - Math.floor(Math.random() * 10000000000)
                ),
            },
            {
                id: 15,
                user: {
                    name: 'Some user name',
                    image: 'https://i.imgur.com/8Km9tLL.png',
                },
                message: 'Some message',
                date: new Date(
                    +new Date() - Math.floor(Math.random() * 10000000000)
                ),
            },
        ],
        []
    )

    useWindowEvent('load', () => {
        ref.current?.scrollIntoView({
            behavior: 'smooth',
        })
    })

    return (
        <main className='flex bg-primary'>
            <Sidebar channels />
            <div
                data-open={open}
                className='flex flex-col lg:data-[open=true]:static data-[open=true]:fixed data-[open=false]:fixed lg:data-[open=false]:static group w-full'
            >
                <Topbar />
                <ScrollArea
                    className='text-white lg:px-10 px-5'
                    style={{
                        height: height - (match ? 85 : open ? 100 : 150),
                        paddingTop: match ? 55 : open ? 60 : 0,
                    }}
                >
                    {dummyMessages.map((message, i) =>
                        i === dummyMessages.length - 1 ? (
                            <div
                                key={message.id * i}
                                ref={ref}
                                className='bg-red-100'
                            >
                                <MessageCard message={message} />
                            </div>
                        ) : (
                            <div key={message.id}>
                                <MessageCard message={message} />
                            </div>
                        )
                    )}
                </ScrollArea>
                <MessageInput />
            </div>
        </main>
    )
}
