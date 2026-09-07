import express from 'express';
import { getIngredients } from "../../database/queries/ingredients.js";

const router = express.Router();

router.get('/ingredients', async (req, res) => {

    try{
        const tags = await getIngredients();

        res.status(200).json({
            data: tags,
        })

    } catch(error) {
        console.log("DB - Erro ao listar ingredients: ", error);
        res.status(500).json({
            message: "DB - Erro ao busca lista de ingredientes",
        });
    }
});

export default router;