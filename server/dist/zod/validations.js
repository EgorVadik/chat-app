"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSchema = exports.UserSignupSchema = exports.UserLoginSchema = void 0;
const zod_1 = require("zod");
exports.UserLoginSchema = zod_1.z.object({
    email: zod_1.z.string().email().trim().nonempty(),
    password: zod_1.z.string().trim().nonempty(),
});
exports.UserSignupSchema = zod_1.z.object({
    name: zod_1.z.string().min(3).max(50).trim().nonempty(),
    email: zod_1.z.string().email().nonempty(),
    password: zod_1.z.string().trim().nonempty(),
});
exports.MessageSchema = zod_1.z.object({
    content: zod_1.z.string().min(1).max(2000).trim().nonempty(),
    channelId: zod_1.z.string().trim().nonempty(),
});
//# sourceMappingURL=validations.js.map