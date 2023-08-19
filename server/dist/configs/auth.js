"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginNotRequired = exports.loginRequired = void 0;
function loginRequired(req, res, next) {
    if (req.isAuthenticated())
        return next();
    return res.status(401).send({ message: 'Unauthorized.' });
}
exports.loginRequired = loginRequired;
function loginNotRequired(req, res, next) {
    if (req.isAuthenticated()) {
        return res.status(400).send({ message: 'Already logged in.' });
    }
    next();
}
exports.loginNotRequired = loginNotRequired;
//# sourceMappingURL=auth.js.map