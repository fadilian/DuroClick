// controllers/CartController.js
import Cart from "../models/CartModel.js";
import Product from "../models/ProductModel.js";
import Order from "../models/OrderModel.js";
import OrderItem from "../models/OrderItemModel.js";


export const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        // Cek apakah produk sudah ada di keranjang pengguna
        const existingCart = await Cart.findOne({ 
            where: { userId, productId } 
        });

        if (existingCart) {
            // Jika produk sudah ada, tambahkan jumlahnya
            await existingCart.update({ quantity: existingCart.quantity + quantity });
            return res.status(200).json({ msg: "Jumlah produk di keranjang diperbarui" });
        }

        // Jika produk belum ada, tambahkan ke keranjang
        await Cart.create({ userId, productId, quantity });
        res.status(201).json({ msg: "Produk ditambahkan ke keranjang" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Server error" });
    }
};

export const getCart = async (req, res) => {
    try {
        const { userId } = req.params;

        // Ambil semua produk di keranjang pengguna
        const cartItems = await Cart.findAll({ 
            where: { userId },
            include: {
                model: Product,
                attributes: ["name", "price", "stock"], // Detail produk yang ingin ditampilkan
            },
        });

        res.status(200).json(cartItems);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Server error" });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const { id } = req.params;

        // Hapus produk dari keranjang berdasarkan ID item di keranjang
        await Cart.destroy({ where: { id } });
        res.status(200).json({ msg: "Produk dihapus dari keranjang" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Server error" });
    }
};

export const clearCart = async (req, res) => {
    try {
        const { userId } = req.params;

        // Hapus semua produk dari keranjang pengguna
        await Cart.destroy({ where: { userId } });
        res.status(200).json({ msg: "Keranjang dikosongkan" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Server error" });
    }
};

export const updateCartQuantity = async (req, res) => {
    try {
        const { id } = req.params; // ID item di keranjang
        const { quantity } = req.body; // Jumlah baru

        // Cari item di keranjang berdasarkan ID
        const cartItem = await Cart.findOne({ where: { id } });

        if (!cartItem) {
            return res.status(404).json({ msg: "Produk tidak ditemukan di keranjang" });
        }

        // Perbarui jumlah barang di keranjang
        await cartItem.update({ quantity });

        res.status(200).json({ msg: "Jumlah barang di keranjang diperbarui" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Server error" });
    }
};

export const checkout = async (req, res) => {
    const { userId } = req.body; // ID user dari request

    try {
        // Ambil semua item di keranjang berdasarkan userId
        const cartItems = await Cart.findAll({
            where: { userId },
            include: { model: Product }
        });

        if (cartItems.length === 0) {
            return res.status(400).json({ msg: "Keranjang kosong" });
        }

        // Hitung total harga
        const total = cartItems.reduce((sum, item) => sum + (item.quantity * item.product.price), 0);

        // Buat transaksi baru di tabel orders
        const order = await Order.create({
            userId,
            total,
            status: "Pending"
        });

        // Masukkan item dari keranjang ke tabel order_items
        for (const item of cartItems) {
            await OrderItem.create({
                orderId: order.id,
                productId: item.productId,
                quantity: item.quantity,
                subtotal: item.quantity * item.product.price
            });

            // Kurangi stok produk
            const product = await Product.findByPk(item.productId);
            await product.update({
                stock: product.stock - item.quantity
            });
        }

        // Hapus semua item di keranjang untuk user tersebut
        await Cart.destroy({ where: { userId } });

        res.status(200).json({ msg: "Checkout berhasil", orderId: order.id });
    } catch (error) {
        console.error("Error during checkout:", error.message);
        res.status(500).json({ msg: "Server error" });
    }
};