import express from "express";
import { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from "../controllers/CategoryController.js";

const router = express.Router();

router.get('/categories', getCategories); // Get all categories
router.get('/categories/:id', getCategoryById); // Get category by ID
router.post('/categories', createCategory); // Create new category
router.patch('/categories/:id', updateCategory); // Update category by ID
router.delete('/categories/:id', deleteCategory); // Delete category by ID

export default router;
