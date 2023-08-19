"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const client_1 = require("@prisma/client");
const app_1 = require("../app");
const bcrypt_1 = require("bcrypt");
const express_1 = require("express");
const passport_1 = __importDefault(require("../passport/passport"));
const validations_1 = require("../zod/validations");
exports.router = (0, express_1.Router)();
exports.router.post('/login', (req, res, next) => {
    passport_1.default.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (info) {
            switch (info.message) {
                case 'Incorrect password.':
                    return res
                        .status(400)
                        .send({ message: 'Incorrect password.' });
                case 'Incorrect email.':
                    return res.status(400).send({ message: 'Incorrect email.' });
                case 'Invalid Data Formats.':
                    return res
                        .status(400)
                        .send({ message: 'Invalid Data Formats.' });
            }
        }
        req.logIn(user, (err) => {
            if (err) {
                return res
                    .status(401)
                    .send({ message: 'Authentication failed', err });
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
            });
        });
    })(req, res, next);
});
exports.router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!validations_1.UserLoginSchema.safeParse(req.body).success) {
        return res.status(400).send({
            message: 'Invalid Data Formats.',
        });
    }
    try {
        const body = req.body;
        yield app_1.prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: yield (0, bcrypt_1.hash)(body.password, 10),
                photo: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
            },
        });
        return res.send({ message: 'User created successfully.' }).status(201);
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.message.includes('Unique constraint')) {
                return res.status(400).send({
                    message: 'User already exists.',
                });
            }
            return res.status(500).send({
                message: 'Internal Server Error.',
            });
        }
    }
}));
exports.router.delete('/logout', (req, res) => {
    req.logOut((err) => {
        if (err) {
            return res.status(500).send({
                message: 'Internal Server Error.',
            });
        }
    });
    res.send({ message: 'Logged out successfully.' });
});
exports.router.get('/user', (req, res) => {
    if (req.isAuthenticated()) {
        const user = req.user;
        return res.send({
            id: user.id,
            name: user.name,
            email: user.email,
            photo: user.photo,
            createdAt: user.createdAt,
            channelId: user.channelId,
        });
    }
    return res.status(401).send({ message: 'Unauthorized.' });
});
exports.router.get('/user/data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.isAuthenticated())
        return res.status(401).send({ message: 'Unauthorized.' });
    const user = yield app_1.prisma.user.findUnique({
        where: {
            id: req.user.id,
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
    });
    return res.send(user).status(200);
}));
//# sourceMappingURL=auth.js.map