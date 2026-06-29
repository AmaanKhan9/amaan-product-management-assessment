const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");
const upload = require("../middleware/multer.middleware");
const bulkUpload = require("../middleware/bulk-upload.middleware");

const productController = require("../controllers/product.controller");

const {
    createProductValidator, updateProductValidator
} = require("../validators/product.validator");

router.post(
    "/",
    authMiddleware,
    upload.single("image"),
    createProductValidator,
    validate,
    productController.create
);

router.get(
    "/",
    authMiddleware,
    productController.findAll
);

router.post(
    "/bulk",
    authMiddleware,
    bulkUpload.single("file"),
    productController.bulkUpload
);

router.get(
    "/export",
    authMiddleware,
    productController.exportProducts
);

router.get(
    "/:id",
    authMiddleware,
    productController.findById
);

router.put(
    "/:id",
    authMiddleware,
    upload.single("image"),
    updateProductValidator,
    validate,
    productController.update
);

router.delete(
    "/:id",
    authMiddleware,
    productController.delete
);

module.exports = router;