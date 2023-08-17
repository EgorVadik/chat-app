import { IoIosArrowBack } from 'react-icons/io'
// import { Member } from '../types/types'
import MemberCard from './MemberCard'
import { ChannelMember } from '@/types/types'
import { useAtom } from 'jotai'
import { onChannelsAtom } from '@/state/atoms'

type Props = {
    members?: ChannelMember[]
    channelName?: string
    channelDescription?: string
}

export default function SideMembers({
    members,
    channelName,
    channelDescription,
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
                <p className='font-bold text-lg'>{channelName}</p>
                <p className='text-lg tracking-base'>{channelDescription}</p>

                <p className='font-bold text-lg mt-10 mb-4'>Members</p>
                <div className='flex flex-col gap-5 mt-2'>
                    {members?.map((member) => (
                        <MemberCard member={member} key={member.id} />
                    ))}
                </div>
            </div>
        </>
    )
}
