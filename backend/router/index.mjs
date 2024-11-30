import { Router } from "express";
import CategoryRouter from "./CategoryRouter.mjs";
import ProductRouter from "./ProductRouter.mjs";

const router = Router();

router.use('/Category',CategoryRouter);
router.use('/Product', ProductRouter);

export default router;