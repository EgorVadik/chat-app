import { prisma } from '../app'
import { loginRequired } from '../configs/auth'
import { Router } from 'express'

export const router = Router()

router.get('/', loginRequired, async (req, res) => {
    const channels = await prisma.channel.findMany({
        where: {
            userIds: {
                has: req.user!.id,
            },
        },
    })

    res.send(channels).status(200)
})

router.post('/', loginRequired, async (req, res) => {
    const { name, description } = req.body
    const newChannel = await prisma.channel.create({
        data: {
            name,
            description,
            userIds: [req.user!.id],
        },
    })

    res.status(201).json(newChannel)
})

router.get('/:id', loginRequired, async (req, res) => {
    const channel = await prisma.channel.findUnique({
        where: {
            id: req.params.id,
        },
        include: {
            members: {
                select: {
                    id: true,
                    name: true,
                    photo: true,
                },
            },
            messages: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            photo: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: 'asc',
                },
            },
        },
    })

    res.send(channel).status(200)
})
