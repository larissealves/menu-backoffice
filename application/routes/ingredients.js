import express from 'express';
import { getIngredients } from "../../database/queries/ingredients.js";

const router = express.Router();

router.get('/ingredients', async (req, res) => {

    const tags = await getIngredients();

    res.status(200).json({
        data: tags,
    })
});

export default router;