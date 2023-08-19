import useChannelSocket from '@/hooks/useChannelSocket'
import { memo } from 'react'

type Props = {
    channelId: string
}

function NotificationChannel({ channelId }: Props) {
    useChannelSocket({ channelId })
    return null
}

export const MemoizedNotificationChannel = memo(NotificationChannel)
