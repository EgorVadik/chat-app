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

export type UserSignup = z.infer<typeof UserSignupSchema>
export type UserLogin = z.infer<typeof UserLoginSchema>
