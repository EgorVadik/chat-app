import { prisma } from '../app'
import { compare } from 'bcrypt'
import { Strategy as LocalStrategy } from 'passport-local'
import { UserLoginSchema } from '../zod/validations'

export const strategy = new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
    },
    async (email, password, done) => {
        const dataValidation = UserLoginSchema.safeParse({
            email,
            password,
        })
        if (dataValidation.success === false) {
            return done(null, false, { message: 'Invalid Data Formats.' })
        }

        const user = await prisma.user.findUnique({ where: { email } })

        if (!user) {
            return done(null, false, { message: 'Incorrect email.' })
        }
        if (!(await compare(password, user.password!))) {
            return done(null, false, { message: 'Incorrect password.' })
        }
        return done(null, user)
    }
)
