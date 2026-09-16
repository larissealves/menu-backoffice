import express from 'express';
import { getCategories } from "../../database/queries/categories.js"

const router = express.Router();

router.get("/categories", async (req, res) => {
    const listIngredients = await getCategories();

    res.status(200).json({
        data: listIngredients,
    });
});

export default router;