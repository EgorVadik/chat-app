import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { NewChannel, NewChannelSchema } from '@/validations/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'
import { useRef, useState } from 'react'
import { DialogClose } from '@radix-ui/react-dialog'
import { useAtom } from 'jotai'
import { channelsUrlAtom } from '@/state/atoms'

export default function NewChannelModal({
    children,
}: {
    children: React.ReactNode
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<NewChannel>({
        resolver: zodResolver(NewChannelSchema),
    })
    const { toast } = useToast()
    const closeRef = useRef<HTMLButtonElement>(null)
    const [loading, setLoading] = useState(false)
    const [channelsUrl, setChannelsUrl] = useAtom(channelsUrlAtom)

    const onSubmit = async (data: NewChannel) => {
        setLoading(true)
        try {
            await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/channel`,
                data,
                {
                    withCredentials: true,
                }
            )

            toast({
                title: 'Channel created',
            })

            setChannelsUrl(
                channelsUrl.endsWith('/')
                    ? `${import.meta.env.VITE_SERVER_URL}/api/channel`
                    : `${import.meta.env.VITE_SERVER_URL}/api/channel/`
            )

            closeRef.current?.click()
        } catch (error) {
            if (error instanceof AxiosError) {
                switch (error.response?.status) {
                    case 401:
                        toast({
                            title: 'Unauthorized',
                            description: 'Please login first',
                        })
                        break

                    default:
                        toast({
                            title: 'Something went wrong',
                            description: 'Please try again',
                        })
                        break
                }
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent className='bg-sidebar border-0 text-lighter-gray'>
                <DialogHeader className='space-y-8'>
                    <DialogTitle className='uppercase font-bold text-lg tracking-base'>
                        New Channel
                    </DialogTitle>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogDescription className='flex flex-col gap-4 items-center'>
                            <input
                                type='text'
                                {...register('name')}
                                className={`bg-search-bar text-lighter-gray w-full rounded-lg px-4 py-3 text-lg font-normal tracking-base placeholder:text-medium-gray outline-none ${
                                    errors.name
                                        ? 'border border-red-500'
                                        : 'border-0'
                                }`}
                                placeholder='Channel Name'
                            />
                            <textarea
                                {...register('description')}
                                className={`bg-search-bar text-lighter-gray w-full p-3 text-lg font-normal tracking-base placeholder:text-medium-gray rounded-lg resize-none outline-none ${
                                    errors.description
                                        ? 'border border-red-500'
                                        : 'border-0'
                                }`}
                                placeholder='Channel Description'
                                rows={3}
                            />
                            <button
                                disabled={loading}
                                className='self-end bg-blue-btn text-lighter-gray px-6 py-2 rounded-lg text-lg font-medium'
                            >
                                {loading ? 'Loading' : 'Save'}
                            </button>
                            <DialogClose ref={closeRef} />
                        </DialogDescription>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
