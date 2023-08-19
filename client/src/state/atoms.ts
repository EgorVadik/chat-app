import type { Channel, ChannelMember, User, UserData } from '@/types/types'
import axios from 'axios'
import { atom } from 'jotai'

const userUrlAtom = atom<string>(
    `${import.meta.env.VITE_SERVER_URL}/api/auth/user`
)
export const userAtom = atom(async (get) => {
    try {
        const res = await axios.get(get(userUrlAtom), {
            withCredentials: true,
        })
        return res.data as User
    } catch (error) {
        return null
    }
})
export const openAtom = atom<boolean>(false)

const userDataUrlAtom = atom<string>(
    `${import.meta.env.VITE_SERVER_URL}/api/auth/user/data`
)
export const userDataAtom = atom(async (get) => {
    try {
        const res = await axios.get(get(userDataUrlAtom), {
            withCredentials: true,
        })
        return res.data as UserData
    } catch (error) {
        return null
    }
})

export const channelsUrlAtom = atom<string>(
    `${import.meta.env.VITE_SERVER_URL}/api/channel`
)
export const channelsAtom = atom(async (get) => {
    try {
        const res = await axios.get(get(channelsUrlAtom), {
            withCredentials: true,
        })
        return res.data as Channel[]
    } catch (error) {
        return null
    }
})

export const onChannelsAtom = atom(true)

export const membersAtom = atom<ChannelMember[]>([])
