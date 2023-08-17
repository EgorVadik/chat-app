import { Link } from 'react-router-dom'
import { Channel } from '../types/types'
import { useAtom } from 'jotai'
import { onChannelsAtom } from '@/state/atoms'

type Props = {
    channel: Channel
}

export default function ChannelCard({ channel }: Props) {
    const [, setOnChannels] = useAtom(onChannelsAtom)

    const getFirstLetter = (name: string) => {
        return name.split(' ').map((name) => name.charAt(0))
    }

    return (
        <Link
            to={`/channel/${channel.id}`}
            className='flex items-center gap-3 hover:bg-medium-gray/30 p-1 rounded-lg duration-300'
            onClick={() => setOnChannels(false)}
        >
            <div className='flex items-center justify-center uppercase bg-dark-gray rounded-lg w-10 h-10 font-semibold text-white text-lg tracking-base'>
                {getFirstLetter(channel.name)}
            </div>
            <p className='uppercase text-mild-gray font-semibold'>
                {channel.name}
            </p>
        </Link>
    )
}
