import type { SearchChannel as Channel } from '@/types/types'
import { useDebouncedState } from '@mantine/hooks'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { ScrollArea } from '@/components/ui/scroll-area'
import SearchChannelCard from './SearchChannelCard'
import { useToast } from '@/components/ui/use-toast'
import { useAtom } from 'jotai'
import { userAtom } from '@/state/atoms'

export default function SearchChannel() {
    const [search, setSearch] = useDebouncedState('', 300)
    const [searchedChannels, setSearchedChannels] = useState<Channel[]>([])
    const [user] = useAtom(userAtom)
    const { toast } = useToast()

    useEffect(() => {
        if (search.trim() === '') {
            setSearchedChannels([])
            return
        }

        const fetchChannels = async () => {
            try {
                const res = await axios.get(
                    `${
                        import.meta.env.VITE_SERVER_URL
                    }/api/channel/search?search=${search}`,
                    {
                        withCredentials: true,
                    }
                )
                const channels = res.data as Channel[]
                if (channels == null || channels.length === 0) {
                    toast({
                        title: 'No channels found',
                        description: 'Try searching for something else',
                        role: 'error',
                    })
                    return
                }

                setSearchedChannels(channels)
            } catch (error) {
                return
            }
        }

        fetchChannels()
    }, [search, toast])

    return (
        <div className='relative'>
            <input
                type='text'
                className='bg-search-bar w-full rounded-lg py-3 px-2 pl-10 text-light-gray focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder:text-medium-gray font-medium'
                placeholder='Search'
                onChange={(e) => setSearch(e.currentTarget.value)}
            />
            <BiSearch className='absolute top-3 left-2 text-2xl' />
            {searchedChannels.length > 0 && (
                <ScrollArea className='absolute top-4 left-0 w-full bg-primary rounded-lg shadow-lg z-20 h-56'>
                    {searchedChannels.map((channel) => (
                        <SearchChannelCard
                            key={channel.id}
                            channel={channel}
                            uid={user!.id}
                        />
                    ))}
                </ScrollArea>
            )}
        </div>
    )
}
