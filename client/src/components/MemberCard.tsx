import { userAtom } from '@/state/atoms'
import { ChannelMember } from '@/types/types'
import { useAtom } from 'jotai'

type Props = {
    member: ChannelMember
}

export default function MemberCard({ member }: Props) {
    const [user] = useAtom(userAtom)

    return (
        <div className='flex items-center gap-4'>
            <img
                src={member.photo ?? 'https://i.imgur.com/8Km9tLL.png'}
                alt={member.name}
                className='w-10 h-10 rounded-lg'
            />
            <p className='text-medium-gray text-lg font-bold truncate w-fit'>
                {member.name} {member.id === user?.id && '(You)'}
            </p>
        </div>
    )
}
