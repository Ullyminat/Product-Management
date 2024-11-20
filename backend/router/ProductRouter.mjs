import ProductController from "../controllers/ProductController.mjs";
import {Router} from 'express'
import { upload } from "../config/uploader.mjs";

const ProductRouter = Router();

ProductRouter.post('/create', upload.single('picture'), ProductController.create)

ProductRouter.get('/load', ProductController.load)

ProductRouter.get('/:filename', ProductController.loadpic)

export default ProductRouter;