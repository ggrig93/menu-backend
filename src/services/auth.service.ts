import jwt from "jsonwebtoken"
import {PrismaClient} from '@prisma/client'
const jwtSecret: string = process.env.JWT_SECRET || "123456"
const tokenExpirationInSeconds = 36000
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

class AuthService {

    /**
     * @description login
     *
     * @param req
     * @param res
     */
    public async login(req, res) {
        try {
            const email = req.body.email
            const password = req.body.password
            const user = await this.findUserByEmail(email)
            if (user) {
                const checkPassword = bcrypt.compareSync(password, user.password)
                if (!checkPassword) {
                    throw new Error("Invalid Password")
                } else {
                    const body = {
                        id: user.id,
                        email: user.email
                    };
                    const token = jwt.sign({user: body}, jwtSecret, {
                        expiresIn: tokenExpirationInSeconds
                    })
                    return {
                        ...user,
                        token
                    }
                }
            } else {
                throw new Error("User Not Found")
            }
        } catch (e) {
            throw new Error(e)
        }
    }

    /**
     * @description Get User Data By His Email Address
     *
     * @param email
     */
    public async findUserByEmail(email: string) {
        return await prisma.user.findUnique({
            where: { email: String(email) }
        })
    }
}
export default new AuthService()