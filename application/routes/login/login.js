import express, { Router } from 'express';
import { checklogin } from '../../../database/queries/login/login.js'
import { appErrorMapper } from '../../erros/appErrorMapper.js';

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

    req.session.user = login.name;

    req.session.save((err) => {
        if (err) {
            console.error('Erro ao salvar sessão:', err);
            throw appErrorMapper(500, 'COOKIE - Erro ao salvar sessão.');
        }

        const data = res.status(200).json({
            user: login.name,
            loginIsValid: login.logginValid,
            message: 'Login realizado'
        });

        return data;

    });
});



export default router;