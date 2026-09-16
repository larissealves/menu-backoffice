import { databaseErrorMapper } from "../../application/responses/erros/databaseErrorMapper.js";
import pool from "../config/pgConnection.js"


export async function getCategories(){
    try{
        const listCategories = await pool.query(
            `SELECT * FROM "Category"`,
        );

        return listCategories.rows;
    }catch(error) {
        console.log("DB - getIngredients() ", error);
        throw databaseErrorMapper(error);
    }
}