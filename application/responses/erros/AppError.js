class AppError extends Error {
    constructor(message, statusCode, code = 'APP_ERROR',  addInformation) {
        super(message);

        this.name = 'AppError';
        this.statusCode = statusCode;
        this.code = code;
        this.cause = addInformation;
        this.isOperational = true;
    }
}

export {AppError}