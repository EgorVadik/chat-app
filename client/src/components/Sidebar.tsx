import { BiSolidChevronDown } from 'react-icons/bi'
import SideChannels from './SideChannels'
import SideMembers from './SideMembers'
import { useAtom } from 'jotai'
import { openAtom } from '../state/atoms'
import ProfileDropdownMenu from './ProfileDropdownMenu'
import { ChannelMember, User } from '@/types/types'

type Props = {
    user: User | null
    channels?: boolean
    members?: ChannelMember[]
    channelName?: string
    channelDescription?: string
}

export default function Sidebar({
    user,
    channels,
    channelDescription,
    channelName,
    members,
}: Props) {
    const [open] = useAtom(openAtom)

    return (
        <>
            <div
                data-open={open}
                className='max-h-screen min-h-screen flex flex-col justify-between lg:max-w-xs lg:min-w-[320px] lg:w-full max-w-sm w-[85%] bg-sidebar text-light-gray transition-all duration-300 lg:opacity-100 lg:translate-x-0 opacity-0 -translate-x-full data-[open=true]:opacity-100 data-[open=true]:translate-x-0 shrink-0 data-[open=false]:shrink z-20'
            >
                <div>
                    {channels ? (
                        <SideChannels />
                    ) : (
                        <SideMembers
                            members={members}
                            channelName={channelName}
                            channelDescription={channelDescription}
                        />
                    )}
                </div>
                <ProfileDropdownMenu>
                    <div className='flex items-center justify-between bg-black-bg px-6 py-4 cursor-pointer hover:bg-gray-950 duration-300 '>
                        <div className='flex items-center gap-4'>
                            <img
                                src={
                                    user?.photo ??
                                    'https://via.placeholder.com/150'
                                }
                                alt='Profile Picture'
                                className='w-10 h-10 rounded-lg'
                            />
                            <p className='text-medium-gray text-lg font-bold truncate w-fit'>
                                {user?.name || 'Loading...'}
                            </p>
                        </div>
                        <BiSolidChevronDown className='text-xl rotate-180 text-gray-400 group-data-[state=open]:rotate-0' />
                    </div>
                </ProfileDropdownMenu>
            </div>
        </>
    )
}
