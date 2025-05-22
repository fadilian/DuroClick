import Product from "../models/ProductModel.js";
import Category from "../models/CategoryModel.js";

// Get All Products
export const getProducts = async (req, res) => {
    try {
        const response = await Product.findAll({
            include: [{ model: Category, attributes: ['name'] }] // Join dengan tabel Category
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Server error" });
    }
};

// Get Product by ID
export const getProductById = async (req, res) => {
    try {
        const response = await Product.findOne({
            where: { id: req.params.id },
            include: [{ model: Category, attributes: ['name'] }] // Join dengan tabel Category
        });
        if (!response) return res.status(404).json({ msg: "Product not found" });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Server error" });
    }
};

// Create Product
export const createProduct = async (req, res) => {
    try {
        const { name, price, stock, categoryId } = req.body;
        await Product.create({ name, price, stock, categoryId });
        res.status(201).json({ msg: "Product Created" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Server error" });
    }
};

// Update Product
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: { id: req.params.id }
        });
        if (!product) return res.status(404).json({ msg: "Product not found" });

        await Product.update(req.body, {
            where: { id: req.params.id }
        });
        res.status(200).json({ msg: "Product Updated" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Server error" });
    }
};

// Delete Product
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: { id: req.params.id }
        });
        if (!product) return res.status(404).json({ msg: "Product not found" });

        await Product.destroy({
            where: { id: req.params.id }
        });
        res.status(200).json({ msg: "Product Deleted" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Server error" });
    }
};
