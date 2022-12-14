import { NextFunction, Request, Response } from "express"
import AuthService from "../services/auth.service"
import { loginValidator } from '../validators';
import {AppError} from "../helpers/error";

class AuthController {

    /**
     * @description Log in
     *
     * @param req
     * @param res
     * @param next
     */
    public async login(req: Request, res: Response, next: NextFunction) {
        try {
            const {error} = loginValidator.validate(req.body);
            if (error) {
                const errorMessages = error.details.map((el) => el.message);
                throw new AppError(400, errorMessages);
            }

            const user = await AuthService.login(req, res);
            return res.status(200).json({
                success: true,
                data: user
            })
        } catch (e) {
            next(e)
        }
    }
}

export default new AuthController()