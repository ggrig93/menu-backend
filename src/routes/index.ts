import express from 'express';
import AuthController from '../controllers/auth.controller';
import ProductController from '../controllers/product.controller';
const router = express.Router();
import multer from 'multer';
import path from 'path';
import {imgFilter} from "../utils/fileUpload";
import CategoryController from "../controllers/category.controller";

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'storage');
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});

const uploader = multer({
    storage,
    fileFilter: imgFilter
});


router.post('/login', AuthController.login);
router.get('/products', ProductController.getProducts);
router.get('/products/:id', ProductController.getProduct);
router.post('/products', [uploader.single('image')], ProductController.create);
router.patch('/products/:id', [uploader.single('image')], ProductController.update);
router.delete('/products/:id', ProductController.delete);
router.get('/categories', CategoryController.getCategories);
router.get('/categories/:id', CategoryController.getCategory);

export = router;