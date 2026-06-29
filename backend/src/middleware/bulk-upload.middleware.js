const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../uploads"));
    },

    filename: (req, file, cb) => {

        cb(
            null,
            crypto.randomUUID() +
            path.extname(file.originalname).toLowerCase()
        );

    }

});

const fileFilter = (req, file, cb) => {

    const allowed = /\.(csv|xlsx)$/i;

    const extension = path.extname(file.originalname);

    if (allowed.test(extension)) {
        return cb(null, true);
    }

    cb(new Error("Only CSV and XLSX files are allowed."));

};

module.exports = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024
    }
});