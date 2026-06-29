const { body } = require("express-validator");

exports.createProductValidator = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Product name is required."),

    body("price")
        .isFloat({ gt: 0 })
        .withMessage("Price must be greater than zero."),

    body("categoryId")
        .trim()
        .notEmpty()
        .withMessage("Category is required."),

    body("image")
        .optional()
        .trim()

];

exports.updateProductValidator = [

    body("name")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Product name cannot be empty."),

    body("price")
        .optional()
        .isFloat({ gt: 0 })
        .withMessage("Price must be greater than zero."),

    body("categoryId")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Category cannot be empty."),

    body("image")
        .optional()
        .trim()

];