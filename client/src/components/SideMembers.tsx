import { IoIosArrowBack } from 'react-icons/io'
import { Member } from '../types/types'
import MemberCard from './MemberCard'

export default function SideMembers() {
    const dummyMembers: Member[] = [
        {
            id: '1',
            name: 'John Doe',
            avatar: 'https://i.pravatar.cc/150?img=1',
        },
        {
            id: '2',
            name: 'Jane Doe',
            avatar: 'https://i.pravatar.cc/150?img=2',
        },
        {
            id: '3',
            name: 'John Smith',
            avatar: 'https://i.pravatar.cc/150?img=3',
        },
        {
            id: '4',
            name: 'Jane Smith',
            avatar: 'https://i.pravatar.cc/150?img=4',
        },
    ]

    return (
        <>
            <div className='shadow-top-bar p-3'>
                <div className='flex items-center gap-2 text-lg'>
                    <IoIosArrowBack className='font-bold text-2xl' />
                    <p>All Channels</p>
                </div>
            </div>
            <div className='px-6 py-3 text-light-gray'>
                <p className='font-bold text-lg'>Channel Name</p>
                <p className='text-lg tracking-base'>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Molestias explicabo commodi magni enim tempora quis itaque
                    cumque nobis incidunt ipsam!
                </p>

                <p className='font-bold text-lg mt-10 mb-4'>Members</p>
                <div className='flex flex-col gap-5 mt-2'>
                    {dummyMembers.map((member) => (
                        <MemberCard member={member} key={member.id} />
                    ))}
                </div>
            </div>
        </>
    )
}
