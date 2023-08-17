import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import axios from 'axios'
import { FaUserCircle } from 'react-icons/fa'
import { IoIosLogOut } from 'react-icons/io'
import { TbTriangles } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'

export default function ProfileDropdownMenu({
    children,
}: {
    children: React.ReactNode
}) {
    const navigate = useNavigate()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
            <DropdownMenuContent className='bg-primary text-light-gray border-search-bar'>
                <DropdownMenuItem>
                    <div className='flex items-center gap-2'>
                        <FaUserCircle className='text-lg' />
                        My Profile
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <div className='flex items-center gap-2'>
                        <TbTriangles className='text-lg' />
                        Tweeter
                    </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator className='bg-search-bar w-[90%] mx-auto' />
                <DropdownMenuItem>
                    <div
                        className='flex items-center gap-2 text-logout-btn cursor-pointer'
                        onClick={async () => {
                            try {
                                await axios.delete(
                                    `${
                                        import.meta.env.VITE_SERVER_URL
                                    }/api/auth/logout`,
                                    {
                                        withCredentials: true,
                                    }
                                )

                                navigate('/')
                                window.location.reload()
                            } catch (error) {
                                console.log(error)
                            }
                        }}
                    >
                        <IoIosLogOut className='text-lg' />
                        Logout
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
