"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionConfig = exports.server = exports.prisma = void 0;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const client_1 = require("@prisma/client");
const http_1 = __importDefault(require("http"));
const io_1 = __importDefault(require("./socket/io"));
exports.prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
exports.server = http_1.default.createServer(app);
const port = 3000;
exports.sessionConfig = (0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        // secure: process.env.NODE_ENV === 'production' ? true : false,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7 * 52,
    },
    store: connect_mongo_1.default.create({
        mongoUrl: process.env.DATABASE_URL,
    }),
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(exports.sessionConfig);
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use((0, cors_1.default)({
    origin: 'https://chat-app-egorvadik.vercel.app',
    credentials: true,
}));
(0, io_1.default)();
const auth_1 = require("./routes/auth");
app.use('/api/auth', auth_1.router);
const channel_1 = require("./routes/channel");
app.use('/api/channel', channel_1.router);
const message_1 = require("./routes/message");
app.use('/api/message', message_1.router);
exports.server.listen((_a = process.env.PORT) !== null && _a !== void 0 ? _a : port, () => console.log(`Listening on port ${port}!`));
//# sourceMappingURL=app.js.map