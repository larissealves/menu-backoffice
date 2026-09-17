import { databaseErrorMapper } from '../../../application/responses/erros/databaseErrorMapper.js';
import pool from '../../config/pgConnectionLogin.js';
import argon2 from 'argon2';

function generatePassword(password) {
    if (!password || !String(password)) return undefined;

    const hash = argon2.hash(password);
    return hash;
};

async function validatePasswordHash(password, dataBaseHash) {
    if (!password || !dataBaseHash) return false;

    const passwordIsValid = await argon2.verify(dataBaseHash, password);
    return passwordIsValid;
};

async function checkUserRole(user_name) {
    if (user_name === '' || user_name === null) {
        return false;
    }

    try {
        const result = await pool.query(
        `
        SELECT user_id, user_role FROM user_role 
        INNER JOIN "login"  
            ON "login"."id" = "user_role"."user_id"
        WHERE 
            ("login"."name"=$1 
                AND
            "login"."isActive"=true
            )
        `, [user_name]
        );

        console.log("USER ROLE RESULT - REMOVE ==>", result.rows)
        return result.rows;

    } catch (error) {
        console.log('ERRO AO CHECAR ROLE DO USER: ', user_name, error)
        throw databaseErrorMapper(error);
    }
}

export async function checklogin(name, password) {
    const listRoles = await checkUserRole(name);

    if (listRoles === false) {
        return data = {
            logginValid: false,
            name: user.name,
            roles: [],
        };
    }

    try {
        const result = await pool.query(
        `
        SELECT name, password, "isActive" 
        FROM login 
        WHERE name=$1 
        `, [name]
        );

        const user = result.rows[0];

        if (result.rows.length === 0 || user.isActive === false) {
            return data = {
                logginValid: false,
                name: user.name,
                roles: [],
            };
        }

        const isValid = await validatePasswordHash(password, user.password);
        const data = {
            logginValid: isValid,
            name: user.name,
            roles: listRoles
        }

        return data;
    } catch (error) {
        console.log('erro ao checar o login: ', error)
        throw error;
    }

}

