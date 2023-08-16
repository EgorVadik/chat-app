export interface Member {
    id: string
    name: string
    avatar: string
}

export interface Channel {
    id: string
    name: string
    description: string
}

export interface Message {
    id: number
    user: {
        name: string
        image: string
    }
    message: string
    date: Date
}
