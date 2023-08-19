import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
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
    try {
        const newChannel = await prisma.channel.create({
            data: {
                name,
                description,
                userIds: [req.user!.id],
            },
        })

        res.status(201).json(newChannel)
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                res.status(400).send('Channel already exists')
            }
        }

        res.status(500).end()
    }
})

router.post('/join', loginRequired, async (req, res) => {
    const { channelId } = req.body

    if (!channelId) {
        return res.status(404).send('Channel Not Found')
    }

    const isMember = await prisma.channel.findFirst({
        where: {
            id: channelId,
            userIds: {
                has: req.user!.id,
            },
        },
    })

    if (isMember) {
        res.status(400).send('Already a member')
        return
    }

    await prisma.channel.update({
        where: {
            id: channelId,
        },
        data: {
            userIds: {
                push: req.user!.id,
            },
        },
    })

    res.status(200).json({
        id: req.user!.id,
        name: req.user!.name,
        photo: req.user!.photo,
    })
})

router.get('/search', loginRequired, async (req, res) => {
    const { search } = req.query

    const channels = await prisma.channel.findMany({
        where: {
            name: {
                contains: search as string,
                mode: 'insensitive',
            },
        },
        select: {
            id: true,
            name: true,
            userIds: true,
            createdAt: true,
            description: true,
        },
    })

    res.send(channels).status(200)
})

router.get('/:id/', loginRequired, async (req, res) => {
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

    if (!channel) {
        return res.status(404).send('Channel Not Found')
    }
    res.send(channel).status(200)
})
