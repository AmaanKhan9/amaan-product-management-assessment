const prisma = require("../config/prisma");

class CategoryRepository {

    async create(data) {
        return prisma.category.create({
            data
        });
    }

    async findById(id) {
        return prisma.category.findUnique({
            where: { id }
        });
    }

    async findByName(name) {
        return prisma.category.findFirst({
            where: {
                name: {
                    equals: name,
                    mode: "insensitive"
                }
            }
        });
    }

    async findAll() {
        return prisma.category.findMany({
            orderBy: {
                name: "asc"
            }
        });
    }

    async update(id, data) {
        return prisma.category.update({
            where: { id },
            data
        });
    }

    async delete(id) {
        return prisma.category.delete({
            where: { id }
        });
    }

    async countProducts(categoryId) {
        return prisma.product.count({
            where: {
                categoryId
            }
        });
    }

}

module.exports = new CategoryRepository();