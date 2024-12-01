import { Router } from "express";
import CategoryRouter from "./CategoryRouter.mjs";
import ProductRouter from "./ProductRouter.mjs";

const router = Router();

router.use('/category',CategoryRouter);
router.use('/product', ProductRouter);

export default router;