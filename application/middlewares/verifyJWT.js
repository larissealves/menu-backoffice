import jwt from 'jsonwebtoken';

import envConf from "../../config/envConf.js"
import { appErrorMapper } from "../responses/erros/appErrorMapper.js";

const SECRET_KEY = envConf.sessionSecret;

const definePermissions = (roles) =>{
    const edit =  roles.includes('edit');
    const view = roles.includes('view');
    const admin = roles.includes('admin');

    return {
        view: view,
        edit: edit,
        admin: admin,
    }
}

export default function verifyJWT(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw appErrorMapper(401, "Token de autorização não fornecido");
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            throw appErrorMapper(403, "Token inválido ou expirado")
        }

        const permittedActions = definePermissions(decoded.roles);
        
        req.userRoles = {user: decoded.user_id, roles: permittedActions};

        next();
    });

}
