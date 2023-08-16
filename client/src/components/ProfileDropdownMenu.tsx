import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { FaUserCircle } from 'react-icons/fa'
import { IoIosLogOut } from 'react-icons/io'
import { TbTriangles } from 'react-icons/tb'

export default function ProfileDropdownMenu({
    children,
}: {
    children: React.ReactNode
}) {
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
                    <div className='flex items-center gap-2 text-logout-btn'>
                        <IoIosLogOut className='text-lg' />
                        Logout
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
