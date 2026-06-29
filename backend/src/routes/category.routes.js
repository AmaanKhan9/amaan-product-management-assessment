const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");

const categoryController = require("../controllers/category.controller");

const {
    createCategoryValidator, updateCategoryValidator
} = require("../validators/category.validator");

router.post(
    "/",
    authMiddleware,
    createCategoryValidator,
    validate,
    categoryController.create
);

router.get(
    "/",
    authMiddleware,
    categoryController.getAll
);

router.get(
    "/:id",
    authMiddleware,
    categoryController.getById
);

router.put(
    "/:id",
    authMiddleware,
    updateCategoryValidator,
    validate,
    categoryController.update
);

router.delete(
    "/:id",
    authMiddleware,
    categoryController.delete
);

module.exports = router;