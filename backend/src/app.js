const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const categoryRoutes = require("./routes/category.routes");
const productRoutes = require("./routes/product.routes");
const errorMiddleware = require("./middleware/error.middleware");

const app = express();

app.use(cors());

app.use(
    helmet({
        crossOriginResourcePolicy: false
    })
);

app.use(morgan("dev"));

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// app.use(express.urlencoded({ extended: true }));

// Routes
// app.get("/", (req, res) => {
//     res.json({
//         success: true,
//         message: "Welcome to the Fullstack Assessment",
//     });
// });

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

app.use(errorMiddleware);

module.exports = app;