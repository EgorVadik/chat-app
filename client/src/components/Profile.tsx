import { useAtom } from 'jotai'
import ProfileInfoItem from './ProfileInfoItem'
import { userAtom } from '@/state/atoms'
import { useNavigate } from 'react-router-dom'
import { IoMdArrowBack } from 'react-icons/io'

export default function Profile() {
    const [user] = useAtom(userAtom)
    const navigate = useNavigate()

    return (
        <div className='w-full space-y-10 text-light-gray'>
            <div className='text-center space-y-2'>
                <button
                    className='flex items-center space-x-2 text-blue-300 hover:text-blue-500 duration-300'
                    onClick={() => navigate(-1)}
                >
                    <IoMdArrowBack className='text-lg' />
                    <span className='text-lg font-medium'>Back</span>
                </button>
                <h1 className='text-4xl tracking-[-1.26px]'>Personal info</h1>
                <p className='text-lg font-light tracking-[-0.63px]'>
                    Basic info, like your name and photo
                </p>
            </div>
            <div className='border border-light-gray rounded-xl'>
                <div className='flex items-center justify-between border-b border-b-light-gray px-10 py-5'>
                    <div>
                        <h2 className='text-2xl tracking-[-0.84px]'>Profile</h2>
                    </div>
                </div>
                <div>
                    <ProfileInfoItem
                        title='photo'
                        data={user?.email ?? ''}
                        image={user?.photo ?? 'https://picsum.photos/200/300'}
                        borderBottom
                    />
                    <ProfileInfoItem
                        title='name'
                        data={user?.name ?? ''}
                        borderBottom
                    />
                    <ProfileInfoItem
                        title='email'
                        data={user?.email ?? ''}
                        borderBottom
                    />
                    <ProfileInfoItem title='password' data='**********' />
                </div>
            </div>
        </div>
    )
}
