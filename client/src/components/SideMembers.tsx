import { IoIosArrowBack } from 'react-icons/io'
import MemberCard from './MemberCard'
import { ChannelMember } from '@/types/types'
import { useAtom } from 'jotai'
import { onChannelsAtom } from '@/state/atoms'
import MembersSkeleton from './MembersSkeleton'
import { Skeleton } from './ui/skeleton'
import { ScrollArea } from '@/components/ui/scroll-area'

type Props = {
    members?: ChannelMember[]
    channelName?: string
    channelDescription?: string
    loading?: boolean
}

export default function SideMembers({
    members,
    channelName,
    channelDescription,
    loading,
}: Props) {
    const [, setOnChannels] = useAtom(onChannelsAtom)

    return (
        <>
            <div className='shadow-top-bar p-3'>
                <div className='flex items-center gap-2 text-lg'>
                    <button onClick={() => setOnChannels(true)}>
                        <IoIosArrowBack className='font-bold text-2xl' />
                    </button>
                    <p>All Channels</p>
                </div>
            </div>
            <div className='px-6 py-3 text-light-gray'>
                {loading ? (
                    <div className='flex flex-col gap-2'>
                        <Skeleton className='w-24 h-6 bg-light-gray' />
                        <Skeleton className='w-full h-24 bg-light-gray' />
                    </div>
                ) : (
                    <>
                        <p className='font-bold text-lg'>{channelName}</p>
                        <p className='text-lg tracking-base'>
                            {channelDescription}
                        </p>
                    </>
                )}

                <p className='font-bold text-lg mt-10 mb-4'>Members</p>
                {loading ? (
                    <div className='flex flex-col gap-5 mt-2'>
                        {new Array(5).fill('-').map((_, i) => (
                            <MembersSkeleton key={i} />
                        ))}
                    </div>
                ) : (
                    <ScrollArea style={{ height: 'calc(100vh - 300px)' }}>
                        <div className='flex flex-col gap-5 mt-2'>
                            {members?.map((member) => (
                                <MemberCard key={member.id} member={member} />
                            ))}
                        </div>
                    </ScrollArea>
                )}
            </div>
        </>
    )
}
