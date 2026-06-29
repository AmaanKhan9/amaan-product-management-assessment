const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const userRepository = require("../repositories/user.repository");

class AuthService {

    async register(data) {

        const { name, email, password } = data;

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser =
            await userRepository.findByEmail(normalizedEmail);

        if (existingUser) {
            throw new ApiError(
                409,
                "Email already exists."
            );
        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        return userRepository.create({

            name,

            email: normalizedEmail,

            password: hashedPassword

        });

    }

    async login(data) {

        const { email, password } = data;

        const normalizedEmail =
            email.trim().toLowerCase();

        const user =
            await userRepository.findByEmail(normalizedEmail);

        if (!user) {
            throw new ApiError(
                401,
                "Invalid email or password."
            );
        }

        const isPasswordValid =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isPasswordValid) {
            throw new ApiError(
                401,
                "Invalid email or password."
            );
        }

        const token =
            jwt.sign(
                {
                    id: user.id,
                    email: user.email
                },
                process.env.JWT_SECRET,
                {
                    expiresIn:
                        process.env.JWT_EXPIRES_IN
                }
            );

        return {

            user: {

                id: user.id,

                name: user.name,

                email: user.email

            },

            token

        };

    }

}

module.exports = new AuthService();