import CategoryController from '../controllers/CategoryController.mjs';
import {Router} from 'express'

const CategoryRouter = Router();

CategoryRouter.post('/create', CategoryController.create);
CategoryRouter.delete('/delete/:id', CategoryController.delete);

export default CategoryRouter;