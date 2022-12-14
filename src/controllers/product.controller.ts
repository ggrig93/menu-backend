import { Request, Response, NextFunction } from 'express';
import ProductService from "../services/product.service";
import {AppError} from "../helpers/error";
import {createMenuPositionValidator, updateMenuPositionValidator} from '../validators';
import CategoryService from "../services/category.service";

class ProductController {

    /**
     * @description Get products list
     *
     * @param req
     * @param res
     * @param next
     */
    public async getProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const products = await ProductService.getAll();
            res.json(products);
        } catch (e) {
            next(e)
        }
    }

    /**
     * @description Create new product
     *
     * @param req
     * @param res
     * @param next
     */
    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const {error} = createMenuPositionValidator.validate(req.body);
            if (error) {
                const errorMessages = error.details.map((el) => el.message);
                throw new AppError(400, errorMessages);
            }
            const image = req.file;
            if (!image) {
                throw new AppError(400, 'Image required.');
            }

            req.body.image = image.filename

            const products = await ProductService.create(req.body);
            res.json(products);
        } catch (e) {
            next(e)
        }
    }

    /**
     * @description Get Product Data By Id
     *
     * @param req
     * @param res
     * @param next
     */
    public async getProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            const products = await ProductService.getById(id);
            res.json(products);
        } catch (e) {
            next(e)
        }
    }

    /**
     * @description Update product data
     *
     * @param req
     * @param res
     * @param next
     */
    public async update(req: Request, res: Response, next: NextFunction) {
        try {

            const {value, error} = updateMenuPositionValidator.validate(req.body);

            const {id} = req.params;
            if (error) {
                const errorMessages = error.details.map((el) => el.message);
                throw new AppError(400, errorMessages);
            }
            const product = await ProductService.getById(id);

            if (!product) {
                throw new AppError(404, 'Invalid product');
            }

            const image = req.file;
            if (image) {
                value.image = image.filename
            }

            if (value.categoryId) {
                const category = await CategoryService.getById(value.categoryId);
                if (!category) {
                    throw new AppError(404, 'Invalid category');
                }

                value.category = {
                    connect: {
                        id: req.body.categoryId,
                    },
                }
                delete value.categoryId
            }

            const products = await ProductService.update(id, value);
            res.json(products);
        } catch (e) {
            next(e)
        }
    }

    /**
     * @description Remove product
     *
     * @param req
     * @param res
     * @param next
     */
    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;

            const product = await ProductService.getById(id);

            if (!product) {
                throw new AppError(404, 'Invalid product');
            }

            await ProductService.delete(id);
            res.status(204).json();
        } catch (e) {
            next(e)
        }
    }
}

export default new ProductController;