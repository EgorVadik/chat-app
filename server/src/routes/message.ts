import { MessageSchema } from '../zod/validations'
import { loginRequired } from '../configs/auth'
import { Router } from 'express'
import { prisma } from '../app'

export const router = Router()

router.post('/', loginRequired, async (req, res) => {
    const { content, channelId } = req.body
    const message = MessageSchema.safeParse({ content, channelId })

    if (!message.success) {
        return res.status(400).send({ message: message.error.errors })
    }

    const newMessage = await prisma.message.create({
        data: {
            content: message.data.content,
            channelId: message.data.channelId,
            userId: req.user!.id,
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    photo: true,
                },
            },
        },
    })

    res.status(201).json(newMessage)
})
