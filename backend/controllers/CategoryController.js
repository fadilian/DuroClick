import Category from "../models/CategoryModel.js";

// Get All Categories
export const getCategories = async (req, res) => {
    try {
        const response = await Category.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Server error" });
    }
};

// Get Category by ID
export const getCategoryById = async (req, res) => {
    try {
        const response = await Category.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!response) return res.status(404).json({ msg: "Category not found" });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Server error" });
    }
};

// Create Category
export const createCategory = async (req, res) => {
    try {
        await Category.create(req.body);
        res.status(201).json({ msg: "Category Created" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Server error" });
    }
};

// Update Category
export const updateCategory = async (req, res) => {
    try {
        const category = await Category.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!category) return res.status(404).json({ msg: "Category not found" });

        await Category.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Category Updated" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Server error" });
    }
};

// Delete Category
export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!category) return res.status(404).json({ msg: "Category not found" });

        await Category.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Category Deleted" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Server error" });
    }
};
