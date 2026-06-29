const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

router.get(
    "/me",
    authMiddleware,
    (req, res) => {

        return res.json({

            success: true,

            message: "Authenticated user.",

            data: req.user

        });

    }
);

module.exports = router;