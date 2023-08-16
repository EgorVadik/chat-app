import { Channel } from '../types/types'
import AddChannelBtn from './AddChannelBtn'
import ChannelCard from './ChannelCard'
import SearchChannel from './SearchChannel'

export default function SideChannels() {
    const dummyChannels: Channel[] = [
        {
            id: '1',
            name: 'general test',
            description: 'This is the general channel',
        },
        {
            id: '2',
            name: 'random',
            description: 'This is the random channel',
        },
        {
            id: '3',
            name: 'announcements',
            description: 'This is the announcements channel',
        },
    ]

    return (
        <>
            <div className='shadow-top-bar p-3'>
                <div className='flex items-center justify-between font-bold text-2xl px-3'>
                    <p>Channels</p>
                    <AddChannelBtn />
                </div>
            </div>
            <div className='px-6 py-3 text-light-gray'>
                <SearchChannel />
                <div className='mt-6 flex flex-col gap-4'>
                    {dummyChannels.map((channel) => (
                        <ChannelCard key={channel.id} channel={channel} />
                    ))}
                </div>
            </div>
        </>
    )
}
