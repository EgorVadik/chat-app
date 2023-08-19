import { SearchChannel } from '@/types/types'
import { Link } from 'react-router-dom'

type props = {
    channel: SearchChannel
    uid: string
}

export default function SearchChannelCard({ channel, uid }: props) {
    return (
        <Link
            to={`/channel/${channel.id}`}
            className='flex justify-between px-4 py-2 hover:bg-medium-gray cursor-pointer duration-300 group'
        >
            <div className='max-w-[220px] '>
                <p className='font-bold text-lg truncate'>{channel.name}</p>
                <p className='truncate'>{channel.description}</p>
            </div>
            <div>
                <p className='text-sm text-medium-gray group-hover:text-primary duration-200 whitespace-nowrap'>
                    {channel.userIds.length}{' '}
                    {channel.userIds.length === 1 ? 'member' : 'members'}
                </p>
                <p>
                    {channel.userIds.includes(uid) && (
                        <span className='text-xs text-medium-gray group-hover:text-primary duration-200 whitespace-nowrap'>
                            (Joined)
                        </span>
                    )}{' '}
                </p>
            </div>
        </Link>
    )
}
