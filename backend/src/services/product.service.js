const ApiError = require("../utils/ApiError");

const fs = require("fs");
const path = require("path");
const csv = require("csv-parse/sync");
const xlsx = require("xlsx");

const productRepository = require("../repositories/product.repository");
const categoryRepository = require("../repositories/category.repository");

class ProductService {

    async create(data, file) {

        const category =
            await categoryRepository.findById(data.categoryId);

        if (!category) {
            throw new ApiError(404, "Category not found.");
        }

        const imagePath = file
            ? `/uploads/${file.filename}`
            : null;

        return productRepository.create({
            name: data.name.trim(),
            price: data.price,
            image: imagePath,
            categoryId: data.categoryId
        });
    }

    async findAll(query) {
        const page = Math.max(Number(query.page) || 1, 1);
        const limit = Math.min(
            Math.max(Number(query.limit) || 10, 1),
            100
        );
        const search = query.search?.trim() || "";
        const sort = query.sort === "desc" ? "desc" : "asc";
        const skip = (page - 1) * limit;
        const where = {};

        if (search) {
            where.OR = [
                {
                    name: {
                        contains: search,
                        mode: "insensitive"
                    }
                },
                {
                    category: {
                        name: {
                            contains: search,
                            mode: "insensitive"
                        }
                    }
                }
            ];
        }

        const orderBy = {
            price: sort
        };

        const products =
            await productRepository.findMany({
                where,
                include: {
                    category: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                },
                orderBy,
                skip,
                take: limit
            });

        const totalItems =
            await productRepository.count({
                where
            });

        return {
            products,
            pagination: {
                page,
                limit,
                totalItems,
                totalPages: Math.ceil(totalItems / limit)
            }
        };
    }

    async findById(id) {

        const product = await productRepository.findById(id);

        if (!product) {
            throw new ApiError(
                404,
                "Product not found."
            );
        }

        return product;
    }

    async update(id, data, file) {

        const product =
            await productRepository.findById(id);

        if (!product) {
            throw new ApiError(404, "Product not found.");
        }

        if (data.categoryId) {
            const category =
                await categoryRepository.findById(data.categoryId);

            if (!category) {
                throw new ApiError(404, "Category not found.");
            }
        }

        const updateData = {};

        if (data.name !== undefined)
            updateData.name = data.name.trim();

        if (data.price !== undefined)
            updateData.price = data.price;

        if (data.categoryId !== undefined)
            updateData.categoryId = data.categoryId;

        if (file) {

            if (product.image) {

                const oldImagePath = path.join(
                    __dirname,
                    "../../",
                    product.image
                );

                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }

            updateData.image = `/uploads/${file.filename}`;
        }

        return productRepository.update(id, updateData);
    }

    async delete(id) {

        const product =
            await productRepository.findById(id);

        if (!product) {
            throw new ApiError(
                404,
                "Product not found."
            );
        }

        if (product.image) {

            const imagePath = path.join(
                __dirname,
                "../../",
                product.image
            );

            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }

        }

        await productRepository.delete(id);

        return {
            id: product.id,
            deleted: true
        };

    }

    async bulkUploadFromFile(file) {

        const ext =
            path.extname(file.originalname).toLowerCase();

        let records = [];

        if (ext === ".csv") {

            const fileContent =
                fs.readFileSync(file.path, "utf8");

            records = csv.parse(fileContent, {
                columns: true,
                skip_empty_lines: true,
                trim: true
            });

        }

        else if (ext === ".xlsx") {

            const workbook =
                xlsx.readFile(file.path);

            const sheet =
                workbook.Sheets[workbook.SheetNames[0]];

            records =
                xlsx.utils.sheet_to_json(sheet);

        } else {
            throw new ApiError(400, "Only CSV and XLSX allowed");
        }

        fs.unlinkSync(file.path);

        const CHUNK_SIZE = 500;

        let created = [];
        let failed = [];

        for (let i = 0; i < records.length; i += CHUNK_SIZE) {

            const chunk = records.slice(i, i + CHUNK_SIZE);

            await Promise.all(
                chunk.map(async (item) => {

                    try {

                        if (!item.name || !item.price || !item.categoryId) {
                            throw new Error("Missing fields");
                        }

                        const category =
                            await categoryRepository.findById(item.categoryId);

                        if (!category) {
                            throw new Error("Invalid category");
                        }

                        const product =
                            await productRepository.create({
                                name: item.name.trim(),
                                price: Number(item.price),
                                image: item.image || null,
                                categoryId: item.categoryId
                            });

                        created.push(product);

                    } catch (err) {
                        failed.push({
                            item,
                            error: err.message
                        });
                    }

                })
            );
        }

        return {
            total: records.length,
            created: created.length,
            failed: failed.length,
            createdItems: created,
            failedItems: failed
        };
    }

    async getExportChunk(skip, take) {

        return productRepository.findMany({

            skip,

            take,

            include: {
                category: {
                    select: {
                        name: true
                    }
                }
            },

            orderBy: {
                createdAt: "asc"
            }

        });

    }

    async exportProducts(format = "csv") {

        format = format.toLowerCase();

        if (!["csv", "xlsx"].includes(format)) {
            throw new ApiError(
                400,
                "Export format must be csv or xlsx."
            );
        }

        const exportDir =
            path.join(__dirname, "../../exports");

        if (!fs.existsSync(exportDir)) {
            fs.mkdirSync(exportDir, { recursive: true });
        }

        const filename =
            `products-${Date.now()}.${format}`;

        const filePath =
            path.join(exportDir, filename);

        const CHUNK_SIZE = 500;

        let skip = 0;

        if (format === "csv") {

            fs.writeFileSync(
                filePath,
                "Name,Price,Category,Image,Created At\n"
            );

            while (true) {

                const products =
                    await this.getExportChunk(skip, CHUNK_SIZE);

                if (!products.length) {
                    break;
                }

                const rows = products.map(product => [

                    product.name,
                    product.price,
                    product.category.name,
                    product.image || "",
                    product.createdAt.toISOString()

                ].join(","));

                fs.appendFileSync(
                    filePath,
                    rows.join("\n") + "\n"
                );

                skip += CHUNK_SIZE;

            }

        }

        else {

            const workbook =
                xlsx.utils.book_new();

            const worksheetData = [];

            while (true) {

                const products =
                    await this.getExportChunk(skip, CHUNK_SIZE);

                if (!products.length) {
                    break;
                }

                worksheetData.push(

                    ...products.map(product => ({

                        Name: product.name,

                        Price: Number(product.price),

                        Category: product.category.name,

                        Image: product.image,

                        CreatedAt: product.createdAt

                    }))

                );

                skip += CHUNK_SIZE;

            }

            const worksheet =
                xlsx.utils.json_to_sheet(worksheetData);

            xlsx.utils.book_append_sheet(
                workbook,
                worksheet,
                "Products"
            );

            xlsx.writeFile(
                workbook,
                filePath
            );

        }

        return {
            filename,
            filePath
        };

    }

}

module.exports = new ProductService();