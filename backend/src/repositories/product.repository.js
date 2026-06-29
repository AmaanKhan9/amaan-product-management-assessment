const prisma = require("../config/prisma");

class ProductRepository {

    async create(data) {
        return prisma.product.create({
            data
        });
    }

    async findById(id) {
        return prisma.product.findUnique({
            where: {
                id
            },
            include: {
                category: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });
    }

    async findMany(options) {
        return prisma.product.findMany(options);
    }

    async count(options) {
        return prisma.product.count(options);
    }

    async update(id, data) {
        return prisma.product.update({
            where: { id },
            data
        });
    }

    async delete(id) {
        return prisma.product.delete({
            where: { id }
        });
    }

}

module.exports = new ProductRepository();