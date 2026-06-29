const prisma = require("../config/prisma");

class UserRepository {

    async create(data) {
        return prisma.user.create({
            data,
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true
            }
        });
    }

    async findByEmail(email) {
        return prisma.user.findUnique({
            where: {
                email
            }
        });
    }

    async findById(id) {
        return prisma.user.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true
            }
        });
    }
}

module.exports = new UserRepository();