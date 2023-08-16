import { formatDate } from '@/lib/utils'
import { Message } from '@/types/types'

type Props = {
    message: Message
}

export default function MessageCard({ message }: Props) {
    return (
        <div className='flex items-center p-2 gap-7'>
            <img
                src={message.user.image}
                alt='Profile Picture'
                className='w-10 h-10 rounded-lg'
            />
            <div className='flex flex-col'>
                <div className='flex items-center gap-2 text-medium-gray'>
                    <p className='text-lg font-bold tracking-base'>
                        {message.user.name}
                    </p>
                    <p className='text-sm'>{formatDate(message.date)}</p>
                </div>
                <p className='text-light-gray text-lg font-medium tracking-base'>
                    {message.message}
                </p>
            </div>
        </div>
    )
}
