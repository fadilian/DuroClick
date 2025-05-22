// routes/FavoriteRoutes.js
import express from "express";
import { addFavorite, getFavoritesByUser, removeFavorite, getAllFavorites } from "../controllers/FavoriteController.js";

const router = express.Router();

// Menambahkan produk ke favorit
router.post('/favorites', addFavorite);

// Mendapatkan semua favorit berdasarkan userId
router.get('/favorites/:userId', getFavoritesByUser);

// Menghapus produk dari favorit
router.delete('/favorites', removeFavorite);

// Mendapatkan semua favorit tanpa filter userId
router.get('/favorites', getAllFavorites);  // Rute ini menampilkan semua favorit

export default router;
