import express from "express";
import { asyncHandler } from "../middlewares/asyncHandler.js";

import { getDish, createDish } from '../../database/queries/dishQueries.js'
import multer from "multer";
import { successResponse } from "../responses/success/successResponse.js";

const upload = multer();
const router = express.Router();

router.get(`/dishes`,
    asyncHandler(async (req, res) => {

        const { name, category, tags, ingredients, currentPage, limit } = req.query;

        const filters = {
            tags: tags,
            ingredients: ingredients,
            category: category,
            name: name,
        }

        const listDishes = await getDish(currentPage, limit, filters);

        const formattedDishes = listDishes.data.map(item => ({
            ...item,
            listImages: (item.listImages ?? [])
                .map(img => {
                    const base64 = img.toString("base64");
                    return `data:image/webp;base64,${base64}`
                })
        }));

        const totalItems = listDishes.totalItems;

        return successResponse(res,
            {
                data: formattedDishes,
                pagination: {
                    totalPages: Number(Math.ceil(totalItems / limit)),
                    currentPage: Number(currentPage),
                    limit: Number(limit),
                }
            }
        );
    }
));

router.post(`/dishes`, upload.none(), async (req, res) => {
    const form = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        createdAt: req.body.createdAt,
        isActive: req.body.isActive,
        categoryId: req.body.categoryId,
        tagsId: JSON.parse(req.body.tagsId),
        ingredientsId: JSON.parse(req.body.ingredientsId),
    }
    const sendForm = await createDish(form);

    return successResponse(res, {
            data: sendForm,
            message: "Prato adicionado com sucesso"
    });
});

export default router;