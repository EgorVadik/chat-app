import { useAtom } from 'jotai'
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import { openAtom, userAtom } from '@/state/atoms'

export default function Home() {
    const [open] = useAtom(openAtom)
    const [user] = useAtom(userAtom)

    return (
        <main className='flex bg-primary'>
            <Sidebar user={user} channels />
            <div
                data-open={open}
                className='flex flex-col lg:data-[open=true]:static data-[open=true]:fixed data-[open=false]:fixed lg:data-[open=false]:static group w-full'
            >
                <Topbar />
            </div>
        </main>
    )
}
