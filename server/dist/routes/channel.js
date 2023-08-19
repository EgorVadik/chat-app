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
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const library_1 = require("@prisma/client/runtime/library");
const app_1 = require("../app");
const auth_1 = require("../configs/auth");
const express_1 = require("express");
exports.router = (0, express_1.Router)();
exports.router.get('/', auth_1.loginRequired, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const channels = yield app_1.prisma.channel.findMany({
        where: {
            userIds: {
                has: req.user.id,
            },
        },
    });
    res.send(channels).status(200);
}));
exports.router.post('/', auth_1.loginRequired, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    try {
        const newChannel = yield app_1.prisma.channel.create({
            data: {
                name,
                description,
                userIds: [req.user.id],
            },
        });
        res.status(201).json(newChannel);
    }
    catch (error) {
        if (error instanceof library_1.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                res.status(400).send('Channel already exists');
            }
        }
        res.status(500).end();
    }
}));
exports.router.post('/join', auth_1.loginRequired, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { channelId } = req.body;
    if (!channelId) {
        return res.status(404).send('Channel Not Found');
    }
    const isMember = yield app_1.prisma.channel.findFirst({
        where: {
            id: channelId,
            userIds: {
                has: req.user.id,
            },
        },
    });
    if (isMember) {
        res.status(400).send('Already a member');
        return;
    }
    yield app_1.prisma.channel.update({
        where: {
            id: channelId,
        },
        data: {
            userIds: {
                push: req.user.id,
            },
        },
    });
    res.status(200).json({
        id: req.user.id,
        name: req.user.name,
        photo: req.user.photo,
    });
}));
exports.router.get('/search', auth_1.loginRequired, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search } = req.query;
    const channels = yield app_1.prisma.channel.findMany({
        where: {
            name: {
                contains: search,
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
    });
    res.send(channels).status(200);
}));
exports.router.get('/:id/', auth_1.loginRequired, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const channel = yield app_1.prisma.channel.findUnique({
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
    });
    if (!channel) {
        return res.status(404).send('Channel Not Found');
    }
    res.send(channel).status(200);
}));
//# sourceMappingURL=channel.js.map