import express from 'express';
import { getIngredients } from "../../database/queries/ingredients.js";
import { successResponse } from '../responses/success/successResponse.js';

const router = express.Router();

router.get('/ingredients', async (req, res) => {

    const tags = await getIngredients();

    return successResponse(res, {
        data: tags,
    });
});

export default router;