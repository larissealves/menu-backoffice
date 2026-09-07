function envConf() {
    const getEnv = import.meta.env.VITE_ENV;

    if(!getEnv) return undefined;

    if (getEnv  === 'development') {
        return {
            vitApiUrl: import.meta.env.VITE_API_URL,
        };
    }

    if (getEnv === 'production') {
        return {
            vitApiUrl: import.meta.env.VITE_API_URL_PROD,
        };
    }

    throw new Error(`Environment not supported: ${getEnv}`);
}

export default envConf();