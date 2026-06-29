const { body } = require("express-validator");

exports.createCategoryValidator = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Category name is required.")

];

exports.updateCategoryValidator = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Category name is required.")

];