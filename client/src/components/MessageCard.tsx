import { formatDate } from '@/lib/utils'
import { Message } from '@/types/types'
import { useMediaQuery, useViewportSize } from '@mantine/hooks'
import moment from 'moment'

type Props = {
    message: Message
}

export default function MessageCard({ message }: Props) {
    const { width } = useViewportSize()
    const match = useMediaQuery('(max-width: 1024px)')

    return (
        <div className='flex p-2 gap-7'>
            <img
                src={message.user.photo ?? 'https://i.imgur.com/8Km9tLL.png'}
                alt='Profile Picture'
                className='w-10 h-10 rounded-lg'
            />
            <div className='flex flex-col'>
                <div className='flex items-center gap-2 text-medium-gray'>
                    <p className='text-lg font-bold tracking-base'>
                        {message.user.name}
                    </p>
                    <p className='text-sm'>
                        {formatDate(moment(message.createdAt).toDate())}
                    </p>
                </div>
                <p
                    className={`text-light-gray text-lg font-medium tracking-base break-words`}
                    style={{ maxWidth: match ? width - 120 : width - 480 }}
                >
                    {message.content}
                </p>
            </div>
        </div>
    )
}
