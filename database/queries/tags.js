import { databaseErrorMapper } from '../../application/responses/erros/databaseErrorMapper.js';
import pool from '../config/pgConnection.js'

export async function getTags() {

    try{
        const listTags = await pool.query(
            `SELECT * FROM "Tag"`,          
        );

        return listTags.rows;

    } catch(error) {
        console.log("DB - getTags() - ", error);
        throw databaseErrorMapper(error);
    }
}