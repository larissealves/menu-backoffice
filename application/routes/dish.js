import express from "express";
import { asyncHandler } from "../middlewares/asyncHandler.js";

import { getDish, createDish } from '../../database/queries/dishQueries.js'
import multer from "multer";
import { successResponse } from "../responses/success/successResponse.js";
import verifyJWT from "../middlewares/verifyJWT.js";
import { appErrorMapper } from "../responses/erros/appErrorMapper.js";

const upload = multer();
const router = express.Router();

router.get(`/dishes`,
    verifyJWT, asyncHandler(async (req, res) => {
        console.log(req.userRoles);

        if (!req.userRoles.roles.view) {
            throw appErrorMapper(403, 'Usuário sem permissão para visualizar')
        }

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

router.post(`/dishes`, upload.none(), 
    verifyJWT, asyncHandler(async (req, res) => {

    if (!req.userRoles.roles.edit) {
        throw appErrorMapper(403, 'Usuário sem permissão para editar')
    }

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
}
));

export default router;