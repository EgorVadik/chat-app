"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("../passport/passport"));
const app_1 = require("../app");
const socket_io_1 = require("socket.io");
exports.default = () => {
    const io = new socket_io_1.Server(app_1.server, {
        cors: {
            origin: 'https://chat-app-egorvadik.vercel.app/',
            credentials: true,
        },
    });
    const wrap = (middleware) => (socket, next) => middleware(socket.request, {}, next);
    io.use(wrap(app_1.sessionConfig));
    io.use(wrap(passport_1.default.initialize()));
    io.use(wrap(passport_1.default.session()));
    io.of('/channels').use(wrap(app_1.sessionConfig));
    io.of('/channels').use(wrap(passport_1.default.initialize()));
    io.of('/channels').use(wrap(passport_1.default.session()));
    io.use((socket, next) => {
        if (socket.request.user) {
            next();
        }
        else {
            next(new Error('unauthorized'));
        }
    });
    io.of('/channels').use((socket, next) => {
        if (socket.request.user) {
            next();
        }
        else {
            next(new Error('unauthorized'));
        }
    });
    io.on('connection', (socket) => {
        socket.on('join-channel', (channelId) => {
            socket.join(channelId);
        });
        socket.on('send-message', (message, channelId) => {
            socket.to(channelId).emit('receive-message', message);
        });
        socket.on('delete-message', (messageId, channelId) => {
            socket.to(channelId).emit('delete-message', messageId);
        });
        socket.on('send-notification', (data) => {
            io.of('/channels')
                .to(data.channelId)
                .emit('receive-notification', data);
        });
        socket.on('send-user-typing', (data) => {
            socket.to(data.channelId).emit('receive-user-typing', data.username);
        });
        socket.on('user-stop-typing', (data) => {
            socket
                .to(data.channelId)
                .emit('receive-user-stop-typing', data.username);
        });
        socket.on('disconnect', () => {
            socket.rooms.forEach((room) => {
                socket.leave(room);
            });
        });
    });
    io.of('/channels').on('connection', (socket) => {
        socket.on('join-channel-notification', (channelId) => {
            socket.join(channelId);
        });
        socket.on('disconnect', () => {
            socket.rooms.forEach((room) => {
                socket.leave(room);
            });
        });
    });
};
//# sourceMappingURL=io.js.map