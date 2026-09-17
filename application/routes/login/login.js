import express, { Router } from 'express';
import { checklogin } from '../../../database/queries/login/login.js'
import { appErrorMapper } from '../../responses/erros/appErrorMapper.js';
import { successResponse } from '../../responses/success/successResponse.js';

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
    console.log("LOGIN RESPONSE => ", login);

    if (!login.logginValid) {
        throw appErrorMapper(401, 'Credenciais inválidas ou conta inativa.');
    }

   
 const formatRoles = {
        view: 'visualizar',
        edit: 'editar',
        admim: 'Admin'
    }

    const roles = login.roles.map(role => formatRoles[role.user_role]);
    req.session.user = login.name;
    req.session.roles = roles;

    req.session.save((err) => {
        if (err) {
            console.error('Erro ao salvar sessão:', err);
            throw appErrorMapper(500, 'COOKIE - Erro ao salvar sessão.');
        }

        return successResponse(res, {
                user: login.name,
                roles: roles || '',
                loggedIn: login.logginValid,
            }, 201
        )

    });
});



export default router;