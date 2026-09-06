function envConf() {
    const getEnv = process.env.NODE_ENV;

    if(!getEnv) return undefined;

    if (getEnv  === 'development') {
        return {
            dataBaseUrl: process.env.DATABASE_URL,
            dataBaseUrlLogin: process.env.DATABASE_URL_LOGIN,
            sessionSecret: process.env.SESSION_SECRET,
            redisURL: process.env.REDIS_URL,
            allowedOrigins: process.env.ALLOWED_ORIGINS,
        };
    }

    if (getEnv === 'prod') {
        return {
            dataBaseUrl: process.env.DATABASE_URL_PROD,
            dataBaseUrlLogin: process.env.DATABASE_URL_LOGIN,
            sessionSecret: process.env.SESSION_SECRET_PROD,
            redisURL: process.env.REDIS_URL_PROD,
            allowedOrigins: process.env.ALLOWED_ORIGINS_PROD,
        };
    }

    throw new Error(`Environment not supported: ${getEnv}`);
}

export default envConf();