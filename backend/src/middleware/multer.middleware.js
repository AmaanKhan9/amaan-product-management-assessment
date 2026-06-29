const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../uploads"));
    },

    filename: (req, file, cb) => {

        const filename =
            crypto.randomUUID() +
            path.extname(file.originalname).toLowerCase();

        cb(null, filename);
    }

});

const fileFilter = (req, file, cb) => {

    const allowed = /jpeg|jpg|png|webp/;

    const isValid =
        allowed.test(file.mimetype) &&
        allowed.test(path.extname(file.originalname).toLowerCase());

    if (isValid) cb(null, true);
    else cb(new Error("Only image files allowed"));
};

module.exports = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});