const CategoryService = require("../services/category.service");
const ApiResponse = require("../utils/ApiResponse");

class CategoryController {

    async create(req, res, next) {

        try {

            const category =
                await CategoryService.create(req.body);

            return res
                .status(201)
                .json(
                    new ApiResponse(
                        201,
                        "Category created successfully.",
                        category
                    )
                );

        } catch (error) {

            next(error);

        }

    }

    async getAll(req, res, next) {

        try {

            const categories =
                await CategoryService.getAll();

            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        "Categories fetched successfully.",
                        categories
                    )
                );

        } catch (error) {

            next(error);

        }

    }

    async getById(req, res, next) {

        try {

            const category =
                await CategoryService.getById(req.params.id);

            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        "Category fetched successfully.",
                        category
                    )
                );

        } catch (error) {

            next(error);

        }

    }

    async update(req, res, next) {

        try {

            const category =
                await CategoryService.update(
                    req.params.id,
                    req.body
                );

            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        "Category updated successfully.",
                        category
                    )
                );

        } catch (error) {

            next(error);

        }

    }

    async delete(req, res, next) {

        try {

            await CategoryService.delete(
                req.params.id
            );

            return res.status(204).send();

        } catch (error) {

            next(error);

        }

    }

}

module.exports = new CategoryController();