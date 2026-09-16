class DataBaseError extends Error {
    constructor(message, statusCode = 500, code = 'DATABASE_ERROR') {
        super(message);

        this.name = 'DataBaseError';
        this.statusCode = statusCode;
        this.code = code;
        this.isOperational = true;
    }
}

export {DataBaseError};