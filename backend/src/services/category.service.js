const ApiError = require("../utils/ApiError");
const categoryRepository = require("../repositories/category.repository");

class CategoryService {

    async create(data) {

        const normalizedName = data.name.trim();

        const existingCategory =
            await categoryRepository.findByName(normalizedName);

        if (existingCategory) {
            throw new ApiError(
                409,
                "Category already exists."
            );
        }

        return categoryRepository.create({
            name: normalizedName
        });

    }

    async getAll() {
        return categoryRepository.findAll();
    }

    async getById(id) {

        const category =
            await categoryRepository.findById(id);

        if (!category) {
            throw new ApiError(
                404,
                "Category not found."
            );
        }

        return category;

    }

    async update(id, data) {

        const category =
            await categoryRepository.findById(id);

        if (!category) {
            throw new ApiError(
                404,
                "Category not found."
            );
        }

        const normalizedName =
            data.name.trim();

        const duplicate =
            await categoryRepository.findByName(normalizedName);

        if (
            duplicate &&
            duplicate.id !== id
        ) {
            throw new ApiError(
                409,
                "Category already exists."
            );
        }

        return categoryRepository.update(
            id,
            {
                name: normalizedName
            }
        );

    }

    async delete(id) {

        const category =
            await categoryRepository.findById(id);

        if (!category) {
            throw new ApiError(
                404,
                "Category not found."
            );
        }

        const totalProducts =
            await categoryRepository.countProducts(id);

        if (totalProducts > 0) {

            throw new ApiError(
                409,
                "Cannot delete category because it contains products."
            );

        }

        await categoryRepository.delete(id);

    }

}

module.exports = new CategoryService();