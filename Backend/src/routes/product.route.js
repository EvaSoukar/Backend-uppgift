import express from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.route('/') 
  .post(createProduct)
  .get(getProducts); // Get all

router.route('/:id')
  .get(getProduct) // Get one
  .put(updateProduct) // Update product
  .patch(updateProduct) // Update product
  .delete(deleteProduct); // delete product

export default router;