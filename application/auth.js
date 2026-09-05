export function requireAuth(req, res, next) {
    if (!req.session.user) {
        return res.status(401).json({
            loggedIn: false,
            message: 'Não autenticado',
            data: [],
        });
    }
    next();
}