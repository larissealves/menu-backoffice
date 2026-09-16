// databaseErrorMapper.js

import { DataBaseError } from "./DataBaseError.js";

function databaseErrorMapper(error) {
    switch (error.code) {
        case '23502':
            return new DataBaseError(
                'Campo obrigatório não foi informado.',
                400,
                'NULL_FIELD'
            );

        case '23505':
            return new DataBaseError(
                'O registro já existe.',
                409,
                'DUPLICATE_ENTRY'
            );

        case '23503':
            return new DataBaseError(
                'A referência informada não existe.',
                400,
                'INVALID_REFERENCE'
            );

        case '22P02':
            return new DataBaseError(
                'O valor informado para o filtro é inválido.',
                400,
                'INVALID_FILTER_VALUE'
            );

        default:
            return new DataBaseError(
                'Erro ao acessar o banco de dados.',
                500,
                'DATABASE_ERROR'
            );
    }
}

export { databaseErrorMapper };