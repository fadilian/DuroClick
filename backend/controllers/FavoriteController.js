import Favorite from "../models/FavoriteModel.js";
import User from "../models/UserModel.js";
import Product from "../models/ProductModel.js";

// Menambahkan Produk ke Favorite
export const addFavorite = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        
        // Mengecek apakah produk sudah ada di favorit
        const existingFavorite = await Favorite.findOne({
            where: {
                userId: userId,
                productId: productId
            }
        });

        if (existingFavorite) {
            return res.status(400).json({ msg: "Product is already in favorites" });
        }

        // Menambahkan produk ke favorit
        await Favorite.create({ userId, productId });
        res.status(201).json({ msg: "Product added to favorites" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Server error" });
    }
};

// Mendapatkan semua favorit pengguna
export const getFavoritesByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        
        const favorites = await Favorite.findAll({
            where: { userId },
            include: [
                {
                    model: Product, 
                    attributes: ['name', 'price', 'stock'],
                }
            ]
        });

        if (!favorites.length) return res.status(404).json({ msg: "No favorites found for this user" });
        res.status(200).json(favorites);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Server error" });
    }
};

// Menghapus produk dari favorit
export const removeFavorite = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        // Mengecek apakah favorit ada
        const favorite = await Favorite.findOne({
            where: { userId, productId }
        });

        if (!favorite) {
            return res.status(404).json({ msg: "Favorite not found" });
        }

        // Menghapus favorit
        await Favorite.destroy({
            where: { userId, productId }
        });
        res.status(200).json({ msg: "Product removed from favorites" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Server error" });
    }
};

// Mendapatkan semua produk favorit (tanpa filter userId)
export const getAllFavorites = async (req, res) => {
    try {
        const favorites = await Favorite.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name', 'email'],  // Menampilkan data user
                },
                {
                    model: Product,
                    attributes: ['name', 'price', 'stock'],  // Menampilkan data produk
                }
            ]
        });

        if (!favorites.length) {
            return res.status(404).json({ msg: "No favorites found" });
        }

        res.status(200).json(favorites);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Server error" });
    }
};

