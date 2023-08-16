import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

export default function NewChannelModal({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent className='bg-sidebar border-0 text-lighter-gray'>
                <DialogHeader className='space-y-8'>
                    <DialogTitle className='uppercase font-bold text-lg tracking-base'>
                        New Channel
                    </DialogTitle>
                    <DialogDescription>
                        <form
                            action=''
                            className='flex flex-col gap-4 items-center'
                        >
                            <input
                                type='text'
                                name='channelName'
                                id='channelName'
                                className='bg-search-bar border-0 text-lighter-gray w-full rounded-lg px-4 py-3 text-lg font-normal tracking-base placeholder:text-medium-gray outline-none'
                                placeholder='Channel Name'
                            />
                            <textarea
                                name='channelDescription'
                                id='channelDescription'
                                className='bg-search-bar border-0 text-lighter-gray w-full p-3 text-lg font-normal tracking-base placeholder:text-medium-gray rounded-lg resize-none outline-none'
                                placeholder='Channel Description'
                                rows={3}
                            />
                            <button className='self-end bg-blue-btn text-lighter-gray px-6 py-2 rounded-lg text-lg font-medium'>
                                Save
                            </button>
                        </form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
