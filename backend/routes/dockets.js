import express from "express";
const router = express.Router();
import { getDockets, getSuppliers, getProducts, getDescription, addDocket } from "../controllers/DocketController.js";
router.route('/').get(getDockets);
router.route('/supplier').get(getSuppliers);
router.route('/products').get(getProducts);
router.route('/description').get(getDescription);
router.route('/create').post(addDocket);

export default router;