import express, { Router } from 'express';
import { checklogin } from '../../../database/queries/login/login.js'
import { appErrorMapper } from '../../responses/erros/appErrorMapper.js';
import { successResponse } from '../../responses/success/successResponse.js';

import jwtGenerate from '../../configs/jwtGenerate.js';

const router = express.Router();

router.post('/login', async (req, res) => {
    const userName = req.body.name;
    const userPassword = req.body.password;

    if (!userName || !userPassword) {
        throw appErrorMapper(400,
            `Campo obrigatório não preenchido., 
                name: ${!userName ? userName : null} - 
                senha: ${!userPassword ? '****' : null}
            `
        );
    }

    const login = await checklogin(userName, userPassword);

    if (!login.logginValid) {
        throw appErrorMapper(401, 'Credenciais inválidas ou conta inativa.');
    }

    const roles = login.roles.map(role => role.user_role);

    const jwtToken = jwtGenerate({userId:login.roles[0].user_id, roles: roles});

    req.session.user = login.name;
    req.session.roles = roles;
    req.session.jwtToken = jwtToken.token;

    req.session.save((err) => {
        if (err) {
            console.error('Erro ao salvar sessão:', err);
            throw appErrorMapper(500, 'COOKIE - Erro ao salvar sessão.');
        }

        return successResponse(res, {
            user: login.name,
            roles: roles || '',
            token: jwtToken.token,
            loggedIn: login.logginValid,
        }, 201
        )

    });
});



export default router;