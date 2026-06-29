const productService = require("../services/product.service");
const ApiResponse = require("../utils/ApiResponse");
const fs = require("fs");

class ProductController {

    async create(req, res, next) {

        try {

            const product = await productService.create(req.body, req.file);

            return res
                .status(201)
                .json(
                    new ApiResponse(
                        201,
                        "Product created successfully.",
                        product
                    )
                );

        } catch (error) {

            next(error);

        }

    }

    async findAll(req, res, next) {
        try {

            const products = await productService.findAll(req.query);

            return res.status(200).json(
                new ApiResponse(
                    200,
                    "Products fetched successfully.",
                    products
                )
            );

        } catch (error) {
            next(error);
        }
    }

    async findById(req, res, next) {

        try {

            const product = await productService.findById(req.params.id);

            return res.status(200).json(
                new ApiResponse(
                    200,
                    "Product fetched successfully.",
                    product
                )
            );

        } catch (error) {
            next(error);
        }

    }

    async update(req, res, next) {

        try {

            const product = await productService.update(
                req.params.id,
                req.body,
                req.file
            );

            return res.status(200).json(
                new ApiResponse(
                    200,
                    "Product updated successfully.",
                    product
                )
            );

        } catch (error) {
            next(error);
        }

    }

    async delete(req, res, next) {

        try {

            const result =
                await productService.delete(req.params.id);

            return res.status(200).json(
                new ApiResponse(
                    200,
                    "Product deleted successfully.",
                    result
                )
            );

        } catch (error) {
            next(error);
        }

    }

    async bulkUpload(req, res, next) {
        try {

            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "File is required"
                });
            }

            const result =
                await productService.bulkUploadFromFile(req.file);

            return res.status(201).json({
                success: true,
                message: "Bulk upload completed",
                data: result
            });

        } catch (err) {
            next(err);
        }
    }

    async exportProducts(req, res, next) {

        try {

            const format = req.query.format || "csv";

            const result = await productService.exportProducts(format);

            console.log(result);

            res.download(result.filePath, result.filename, (err) => {

                fs.unlink(result.filePath, () => { });

                if (err) {
                    return next(err);
                }
            });

        } catch (err) {
            console.log("EXPORT ERROR:", err);
            next(err);
        }
    }


}

module.exports = new ProductController();