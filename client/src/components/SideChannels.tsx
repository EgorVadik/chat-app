import { useAtom } from 'jotai'
import AddChannelBtn from './AddChannelBtn'
import ChannelCard from './ChannelCard'
import SearchChannel from './SearchChannel'
import { channelsAtom } from '@/state/atoms'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function SideChannels() {
    const [channels] = useAtom(channelsAtom)

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
                <ScrollArea style={{ height: 'calc(100vh - 200px)' }}>
                    <div className='mt-6 flex flex-col gap-4'>
                        {channels == null || channels.length === 0
                            ? 'No Joined Channels'
                            : channels.map((channel) => (
                                  <ChannelCard
                                      key={channel.id}
                                      channel={channel}
                                  />
                              ))}
                    </div>
                </ScrollArea>
            </div>
        </>
    )
}
