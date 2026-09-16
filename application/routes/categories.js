import express from 'express';
import { getCategories } from "../../database/queries/categories.js"
import { successResponse } from '../responses/success/successResponse.js';

const router = express.Router();

router.get("/categories", async (req, res) => {
    const listIngredients = await getCategories();

    return successResponse(res, {
        data: listIngredients,
    });
});

export default router;