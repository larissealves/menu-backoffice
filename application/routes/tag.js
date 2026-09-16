import express from 'express';
import { getTags } from '../../database/queries/tags.js'
import { successResponse } from '../responses/success/successResponse.js';

const router = express.Router();

router.get('/tags', async (req, res) => {
    const tags = await getTags();
    return successResponse(res, {
        data: tags,
    });
});

export default router;