import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient();

class CategoryService {

    /**
     * @description Get categories list
     */
    public async getAll() {
        return prisma.category.findMany()
    }

    /**
     * @description Get Category Data By Id
     *
     * @param id
     */
    public async getById(id: string) {
        return prisma.category.findUnique({
            where: { id: id }
        })
    }

}
export default new CategoryService()