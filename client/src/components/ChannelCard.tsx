import { Channel } from '../types/types'

type Props = {
    channel: Channel
}

export default function ChannelCard({ channel }: Props) {
    const getFirstLetter = (name: string) => {
        return name.split(' ').map((name) => name.charAt(0))
    }

    return (
        <div className='flex items-center gap-3'>
            <div className='flex items-center justify-center uppercase bg-dark-gray rounded-lg w-10 h-10 font-semibold text-white text-lg tracking-base'>
                {getFirstLetter(channel.name)}
            </div>
            <p className='uppercase text-mild-gray font-semibold'>
                {channel.name}
            </p>
        </div>
    )
}
