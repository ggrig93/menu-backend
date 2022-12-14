import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient();

class ProductService {
    /**
     * @description Get products list
     */
    public async getAll() {
        return prisma.product.findMany({
            where: { deletedAt: false }
        })
    }

    /**
     * @description Create new product
     *
     * @param payload
     */
    public async create(payload) {
        return await prisma.product.create({
            data: {
                name: payload.name,
                description: payload.description,
                price: parseFloat(payload.price),
                image: payload.image,
                category: {
                    connect: {
                        id: payload.categoryId,
                    },
                },
            }
        })
    }

    /**
     * @description Update product data
     *
     * @param id
     * @param values
     */
    public async update(id: string, values: object) {
        return await prisma.product.update({
            where: {
                id: id
            },
            data: values
        })
    }

    /**
     * @description Get Product Data By Id
     *
     * @param id
     */
    public async getById(id: string) {
        return prisma.product.findUnique({
            where: { id: id },
        })
    }

    /**
     * @description Remove product
     *
     * @param id
     */
    public async delete(id: string) {
        return prisma.product.update({
            where: { id: id },
            data: { deletedAt: true }
        })
    }

}
export default new ProductService()