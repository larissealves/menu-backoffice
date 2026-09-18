import { appErrorMapper } from "../responses/erros/appErrorMapper.js";

export function requireAuth(req, res, next) {
    if (!req.session.user ) {
        throw appErrorMapper(401);
    }

    if (!req.session.jwtToken ) {
        throw appErrorMapper(403, 'Não foi possivel identificar o token de autorização');
    }

    next();
}