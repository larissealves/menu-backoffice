import { appErrorMapper } from "../responses/erros/appErrorMapper.js";

export function requireAuth(req, res, next) {
    if (!req.session.user) {
        throw appErrorMapper(401);
    }
    next();
}