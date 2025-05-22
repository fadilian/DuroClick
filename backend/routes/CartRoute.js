// routes/CartRoutes.js
import express from "express";
import { addToCart, getCart, removeFromCart, clearCart, updateCartQuantity, checkout} from "../controllers/CartController.js";

const router = express.Router();

// Tambahkan produk ke keranjang
router.post("/cart", addToCart);

// Lihat isi keranjang berdasarkan userId
router.get("/cart/:userId", getCart);

// Hapus produk tertentu dari keranjang
router.delete("/cart/:id", removeFromCart);

// Kosongkan keranjang
router.delete("/cart/user/:userId", clearCart);

// Update jumlah barang di keranjang
router.patch("/cart/:id", updateCartQuantity);

// Checkout keranjang
router.post("/cart/checkout", checkout);


export default router;
