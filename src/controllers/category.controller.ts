import { Request, Response, NextFunction } from 'express';
import CategoryService from "../services/category.service";

class CategoryController {

    /**
     * @description Get categories list
     *
     * @param req
     * @param res
     * @param next
     */
    public async getCategories(req: Request, res: Response, next: NextFunction) {
        try {
            const categories = await CategoryService.getAll();
            res.json(categories);
        } catch (e) {
            next(e)
        }
    }

    /**
     * @description Get Category Data By Id
     *
     * @param req
     * @param res
     * @param next
     */
    public async getCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            const category = await CategoryService.getById(id);
            res.json(category);
        } catch (e) {
            next(e)
        }
    }
}

export default new CategoryController;