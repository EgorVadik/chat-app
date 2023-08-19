export interface User {
    id: string
    email: string
    name: string
    photo: string | null
    createdAt: Date
    channelId: string[]
}

export interface UserData extends User {
    channels: Channel[]
}

export interface Channel {
    id: string
    name: string
    description: string
    createdAt: Date
    userIds: string[]
    messages?: Message[]
    members?: ChannelMember[]
}

export type SearchChannel = Omit<Channel, 'messages' | 'members'>

export interface ChannelMember {
    id: string
    name: string
    photo: string | null
}

export interface Message {
    id: string
    content: string
    createdAt: Date
    channelId: string
    userId: string
    date: string
    user: {
        id: string
        name: string
        photo: string | null
    }
}

export interface Notification {
    channelId: string
    content: string
    createdAt: Date
    channelName: string
    username: string
}
