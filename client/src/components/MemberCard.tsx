import { Member } from '../types/types'

type Props = {
    member: Member
}

export default function MemberCard({ member }: Props) {
    return (
        <div className='flex items-center gap-4'>
            <img
                src={member.avatar}
                alt={member.name}
                className='w-10 h-10 rounded-lg'
            />
            <p className='text-medium-gray text-lg font-bold truncate w-fit'>
                {member.name}
            </p>
        </div>
    )
}
