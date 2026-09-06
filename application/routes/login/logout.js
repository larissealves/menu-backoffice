import express  from 'express'

const router = express.Router();

router.get('/logout', (req, res) => {

    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Erro ao encerrar a sessão.');
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
