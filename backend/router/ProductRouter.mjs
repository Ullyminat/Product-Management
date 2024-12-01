import ProductController from "../controllers/ProductController.mjs";
import {Router} from 'express'
import { upload } from "../config/uploader.mjs";

const ProductRouter = Router();

ProductRouter.post('/create/:id', upload.single('picture'), ProductController.create);
ProductRouter.get('/load', ProductController.load);
ProductRouter.get('/:filename', ProductController.loadpic);
ProductRouter.put('/update/:id', ProductController.update);
ProductRouter.delete('/delete/:id', ProductController.delete);

export default ProductRouter;