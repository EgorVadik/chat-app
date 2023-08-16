import { useAtom } from 'jotai'
import { IoIosMenu, IoMdClose } from 'react-icons/io'
import { openAtom } from '../state/atoms'

export default function Topbar() {
    const [, setOpen] = useAtom(openAtom)

    return (
        <div className='fixed group-data-[open=false]:fixed lg:group-data-[open=false]:static lg:block flex group-data-[open=true]:justify-end bg-primary h-fit w-full shadow-top-bar p-[11px] lg:py-4 lg:px-20 text-light-gray font-bold tracking-base uppercase group z-50'>
            <div className='flex items-center gap-3 group-data-[open=true]:hidden lg:group-data-[open=true]:flex w-full'>
                <button onClick={() => setOpen(true)}>
                    <IoIosMenu className='text-2xl lg:hidden' />
                </button>
                <p className='truncate w-fit'>Some random channel name</p>
            </div>
            <button
                onClick={() => setOpen(false)}
                className='bg-sidebar p-2 rounded-xl lg:opacity-0 lg:hidden translate-x-full opacity-0 group-data-[open=true]:opacity-100 group-data-[open=true]:translate-x-0 transition-all duration-300 w-fit'
            >
                <IoMdClose className='text-lg' />
            </button>
        </div>
    )
}
