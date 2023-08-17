import { Prisma, type User, Channel, Message } from '@prisma/client'
import { prisma } from '../app'
import { hash } from 'bcrypt'
import { Router } from 'express'
import passport from '../passport/passport'
import { UserLoginSchema } from '../zod/validations'

export const router = Router()

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err: Error, user: User, info: any) => {
        if (err) {
            return next(err)
        }
        if (info) {
            switch (info.message) {
                case 'Incorrect password.':
                    return res
                        .status(400)
                        .send({ message: 'Incorrect password.' })
                case 'Incorrect email.':
                    return res.status(400).send({ message: 'Incorrect email.' })
                case 'Invalid Data Formats.':
                    return res
                        .status(400)
                        .send({ message: 'Invalid Data Formats.' })
            }
        }

        req.logIn(user, (err: Error) => {
            if (err) {
                return res
                    .status(401)
                    .send({ message: 'Authentication failed', err })
            }
            return res.status(200).json({
                message: 'Welcome back ' + user.name,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    photo: user.photo,
                    createdAt: user.createdAt,
                    channelId: user.channelId,
                },
            })
        })
    })(req, res, next)
})

router.post('/register', async (req, res) => {
    if (!UserLoginSchema.safeParse(req.body).success) {
        return res.status(400).send({
            message: 'Invalid Data Formats.',
        })
    }
    try {
        const body = req.body as User
        await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: await hash(body.password, 10),
                photo: `https://i.pravatar.cc/150?img=${Math.floor(
                    Math.random() * 70
                )}`,
            },
        })

        return res.send({ message: 'User created successfully.' }).status(201)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.message.includes('Unique constraint')) {
                return res.status(400).send({
                    message: 'User already exists.',
                })
            }

            return res.status(500).send({
                message: 'Internal Server Error.',
            })
        }
    }
})

router.delete('/logout', (req, res) => {
    req.logOut((err) => {
        if (err) {
            return res.status(500).send({
                message: 'Internal Server Error.',
            })
        }
    })
    res.send({ message: 'Logged out successfully.' })
})

router.get('/user', (req, res) => {
    if (req.isAuthenticated()) {
        const user = req.user as User

        return res.send({
            id: user.id,
            name: user.name,
            email: user.email,
            photo: user.photo,
            createdAt: user.createdAt,
            channelId: user.channelId,
        })
    }
    return res.status(401).send({ message: 'Unauthorized.' })
})

router.get('/user/data', async (req, res) => {
    if (!req.isAuthenticated())
        return res.status(401).send({ message: 'Unauthorized.' })

    const user = await prisma.user.findUnique({
        where: {
            id: (req.user as User).id,
        },
        include: {
            channels: {
                include: {
                    messages: {
                        orderBy: {
                            createdAt: 'desc',
                        },
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
            },
        },
        // select: {
        //     password: false,
        //     id: true,
        //     name: true,
        //     email: true,
        //     photo: true,
        //     createdAt: true,
        //     channelId: true,
        //     channels: {
        //         select: {
        //             id: true,
        //             name: true,
        //             members: true,
        //             description: true,
        //             messages: {
        //                 orderBy: {
        //                     createdAt: 'desc',
        //                 },
        //             },
        //         },
        //         orderBy: {
        //             createdAt: 'desc',
        //         },
        //     },
        // },
    })

    return res.send(user).status(200)
})
