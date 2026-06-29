const authService = require("../services/auth.service");
const ApiResponse = require("../utils/ApiResponse");

class AuthController {

    async register(req, res, next) {

        try {

            const user =
                await authService.register(req.body);

            return res
                .status(201)
                .json(
                    new ApiResponse(
                        201,
                        "User registered successfully.",
                        user
                    )
                );

        } catch (error) {

            next(error);

        }

    }

    async login(req, res, next) {

        try {

            const result =
                await authService.login(req.body);

            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        "Login successful.",
                        result
                    )
                );

        } catch (error) {

            next(error);

        }

    }

}

module.exports = new AuthController();