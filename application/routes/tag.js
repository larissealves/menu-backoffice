import express from 'express';
import { getTags } from '../../database/queries/tags.js'

const router = express.Router();

router.get('/tags', async (req, res) => {
    const tags = await getTags();
    res.status(200).json({
        data: tags,
    });
});

export default router;