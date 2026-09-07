import express from 'express';
import {getTags} from '../../database/queries/tags.js'

const router = express.Router();

router.get('/tags', async (req, res) => {
    try {
        const tags = await getTags();
        res.status(200).json({
            data: tags,
        });
    } 
    catch (error) {
        console.log("DB - Erro ao listar tags: ", error);
        res.status(500).json({
            message: "DB - Erro ao listar as tags",
        })
    }
}); 

export default router;