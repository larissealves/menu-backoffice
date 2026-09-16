// databaseErrorMapper.js

import { AppError } from "./AppError.js";

function appErrorMapper(error, addInformation) {
    console.log("REMOVER ERROR => ", error)
    switch (error) {
        case 401:
            return new AppError(
                'Usuário não autenticado',
                401,
                addInformation,
                'UNAUTHORIZED'
            );

        case 403:
            return new AppError(
                'Usuário sem permissão para executar esta ação',
                403,
                addInformation,
                'FORBIDDEN'
            );

        case 400:
            return new AppError(
                'URL inválida. Verifique os parâmetros informados',
                400,
                addInformation,
                'BAD_REQUEST'
            );

        case 404:
            return new AppError(
                'Recurso não encontrado. Verifique os parâmetros informados',
                400,
                addInformation,
                'INVALID_FILTER_VALUE'
            );

        default:
            return new AppError(
                'Erro ao ao processar a requisição. Erro não identificado',
                501,
                'APP_DEFAULT_ERROR',
                addInformation,
            );
    }
}

export { appErrorMapper };