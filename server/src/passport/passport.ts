import passport from 'passport'
import { strategy as LocalStrategy } from './LocalStrategy'
import { prisma } from '../app'

passport.use('local', LocalStrategy)

passport.serializeUser((user: any, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id: string, done) => {
    const user = await prisma.user.findUnique({ where: { id } })
    done(null, user)
})

export default passport
