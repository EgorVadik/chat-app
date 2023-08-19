import axios, { AxiosError } from 'axios'
import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'

type Props = {
    channelId: string
}

export default function NotInChannel({ channelId }: Props) {
    const { toast } = useToast()
    const [loading, setLoading] = useState(false)

    const handleJoin = async () => {
        setLoading(true)
        try {
            await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/channel/join`,
                {
                    channelId,
                },
                {
                    withCredentials: true,
                }
            )

            window.location.reload()
        } catch (error) {
            if (error instanceof AxiosError) {
                switch (error.response?.status) {
                    case 404:
                        toast({
                            title: 'Channel not found',
                            description: 'Channel does not exist',
                        })
                        break
                    case 401:
                        toast({
                            title: 'Unauthorized',
                            description: 'You must be logged in to join',
                        })
                        break
                    case 400:
                        toast({
                            title: 'Already a member',
                        })
                        break

                    default:
                        toast({
                            title: 'Something went wrong',
                            description: 'Could not join channel',
                        })
                        break
                }
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='flex flex-col gap-8 items-center justify-center h-screen text-lighter-gray bg-primary'>
            <div className='text-center'>
                <h1 className='text-3xl font-bold'>Not in channel</h1>
                <p className='text-xl'>You must be in a channel to view it</p>
            </div>
            <button
                disabled={loading}
                onClick={handleJoin}
                className='bg-blue-btn px-6 py-2 rounded-lg'
            >
                {loading ? 'Loading...' : 'Join Channel'}
            </button>
        </div>
    )
}
