import { z } from 'zod'

export const UserLoginSchema = z.object({
    email: z.string().email().trim().nonempty(),
    password: z.string().trim().nonempty(),
})

export const UserSignupSchema = z.object({
    name: z.string().min(3).max(50).trim().nonempty(),
    email: z.string().email().nonempty(),
    password: z.string().trim().nonempty(),
})

export const MessageSchema = z.object({
    content: z.string().min(1).max(2000).trim().nonempty(),
    channelId: z.string().trim().nonempty(),
})

export type Message = z.infer<typeof MessageSchema>
export type UserSignup = z.infer<typeof UserSignupSchema>
export type UserLogin = z.infer<typeof UserLoginSchema>
