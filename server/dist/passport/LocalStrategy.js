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
exports.strategy = void 0;
const app_1 = require("../app");
const bcrypt_1 = require("bcrypt");
const passport_local_1 = require("passport-local");
const validations_1 = require("../zod/validations");
exports.strategy = new passport_local_1.Strategy({
    usernameField: 'email',
    passwordField: 'password',
}, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    const dataValidation = validations_1.UserLoginSchema.safeParse({
        email,
        password,
    });
    if (dataValidation.success === false) {
        return done(null, false, { message: 'Invalid Data Formats.' });
    }
    const user = yield app_1.prisma.user.findUnique({ where: { email } });
    if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
    }
    if (!(yield (0, bcrypt_1.compare)(password, user.password))) {
        return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
}));
//# sourceMappingURL=LocalStrategy.js.map