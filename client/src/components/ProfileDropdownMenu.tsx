import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import axios, { AxiosError } from 'axios'
import { FaUserCircle } from 'react-icons/fa'
import { IoIosLogOut } from 'react-icons/io'
import { TbTriangles } from 'react-icons/tb'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '@/components/ui/use-toast'

export default function ProfileDropdownMenu({
    children,
}: {
    children: React.ReactNode
}) {
    const navigate = useNavigate()
    const { toast } = useToast()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
            <DropdownMenuContent className='bg-primary text-light-gray border-search-bar'>
                <Link to={'/profile'} className='w-full'>
                    <DropdownMenuItem className='flex items-center gap-2 cursor-pointer'>
                        <FaUserCircle className='text-lg' />
                        My Profile
                    </DropdownMenuItem>
                </Link>
                <DropdownMenuItem>
                    <div className='flex items-center gap-2'>
                        <TbTriangles className='text-lg' />
                        Tweeter
                    </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator className='bg-search-bar w-[90%] mx-auto' />
                <DropdownMenuItem
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
                            if (error instanceof AxiosError) {
                                toast({
                                    title: 'An error occurred',
                                    description:
                                        'Failed to logout, try again later.',
                                })
                            }
                        }
                    }}
                >
                    <IoIosLogOut className='text-lg' />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
