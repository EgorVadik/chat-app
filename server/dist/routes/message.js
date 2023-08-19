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
const validations_1 = require("../zod/validations");
const auth_1 = require("../configs/auth");
const express_1 = require("express");
const app_1 = require("../app");
exports.router = (0, express_1.Router)();
exports.router.post('/', auth_1.loginRequired, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, channelId } = req.body;
    const message = validations_1.MessageSchema.safeParse({ content, channelId });
    if (!message.success) {
        return res.status(400).send({ message: message.error.errors });
    }
    const newMessage = yield app_1.prisma.message.create({
        data: {
            content: message.data.content,
            channelId: message.data.channelId,
            userId: req.user.id,
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
    });
    res.status(201).json(newMessage);
}));
//# sourceMappingURL=message.js.map