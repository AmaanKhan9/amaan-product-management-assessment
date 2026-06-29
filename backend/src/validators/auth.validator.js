const { body } = require("express-validator");

const registerValidator = [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").trim().isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must contain at least 6 characters")
];

const loginValidator = [
    body("email").trim().isEmail().withMessage("Invalid email."),
    body("password").notEmpty().withMessage("Password is required.")
];

module.exports = {
    registerValidator,
    loginValidator
};