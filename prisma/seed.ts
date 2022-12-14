import {users} from './seeds/user'
import {categories} from './seeds/category'
import {PrismaClient} from '@prisma/client'
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    for (let user of users) {
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, salt);
        await prisma.user.create({
            data: user,
        })
    }

    for (let category of categories) {
        await prisma.category.create({
            data: category,
        })
    }
}

main().catch(e => {
    console.log(e);
    process.exit(1)
}).finally(() => {
    prisma.$disconnect();
})