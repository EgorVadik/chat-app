import { NextFunction, Request, Response } from 'express'

function loginRequired(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) return next()
    return res.status(401).send({ message: 'Unauthorized.' })
}

function loginNotRequired(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        return res.status(400).send({ message: 'Already logged in.' })
    }
    next()
}

export { loginRequired, loginNotRequired }
