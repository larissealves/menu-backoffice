import express from 'express'
import { appErrorMapper } from '../../responses/erros/appErrorMapper.js';

const router = express.Router();

router.get('/logout', (req, res) => {

    req.session.destroy((err) => {
        if (err) {
            throw appErrorMapper(500, 'Erro ao encerrar a sessão.')
        }

        res.clearCookie('user');

        return res.status(200).json({
            data: '',
            message: "Usuário desconectado",
            loggedIn: false,
        })
    });


});


export default router;
