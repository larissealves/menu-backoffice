const errorHandler = (err, req, res, next) => {
    console.error(err);

    if (err.isOperational) {
        return res.status(err.statusCode).json({
            error: {
                code: err.code,
                message: err.message,
            }
        });
    }

    return res.status(500).json({
        error: {            
            code: 'INTERNAL_ERROR',
            message: 'Erro interno do servidor.',
        }
    });
};

export { errorHandler };