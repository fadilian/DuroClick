import express from "express";
import {  getProducts,  getProductById,  createProduct,  updateProduct,  deleteProduct } from "../controllers/ProductController.js";

const router = express.Router();

router.get('/products', getProducts); // Get all products
router.get('/products/:id', getProductById); // Get product by ID
router.post('/products', createProduct); // Create new product
router.patch('/products/:id', updateProduct); // Update product by ID
router.delete('/products/:id', deleteProduct); // Delete product by ID

export default router;
