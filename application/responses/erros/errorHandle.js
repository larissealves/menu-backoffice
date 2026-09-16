const errorHandler = (err, req, res, next) => {
    return res.status(err.statusCode).json({
        error: {
            code: err.code,
            message: err.message,
            cause: err.cause || '',
        }
    });

};

export { errorHandler };