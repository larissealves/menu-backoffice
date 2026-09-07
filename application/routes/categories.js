import express from 'express';
import {getCategories} from "../../database/queries/categories.js"

const router = express.Router();

router.get("/categories", async (req, res) =>{
    try{
        const listIngredients = await getCategories();

        res.status(200).json({
            data: listIngredients,
        })

    } catch(error) {
        console.log("DB - Erro ao listar categories: ", error);
        res.status(500).json({
            message: "DB - Erro ao listar categories",
        });
    }
});

export default router;