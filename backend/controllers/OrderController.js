import Order from "../models/OrderModel.js";
import OrderItem from "../models/OrderItemModel.js";
import Product from "../models/ProductModel.js";

export const getOrderHistory = async (req, res) => {
    const { userId } = req.query; // Ambil userId dari query parameter
    try {
        const orders = await Order.findAll({
            where: { userId }, // Filter berdasarkan userId
            attributes: ['id', 'total', 'status', 'createdAt'], // Pilih kolom yang ingin ditampilkan
            order: [['createdAt', 'DESC']], // Urutkan berdasarkan waktu transaksi
        });
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching order history:", error.message);
        res.status(500).json({ msg: "Server error" });
    }
};

export const getOrderDetails = async (req, res) => {
    const { orderId } = req.params; // Ambil orderId dari parameter URL
    try {
        const items = await OrderItem.findAll({
            where: { orderId }, // Filter berdasarkan orderId
            include: [
                {
                    model: Product, // Join dengan tabel Product
                    as: 'product', // Alias yang digunakan di model
                    attributes: ['id', 'name', 'price'], // Ambil kolom yang dibutuhkan dari Product
                },
            ],
            attributes: ['quantity', 'subtotal'], // Ambil kolom dari OrderItem
        });
        res.status(200).json(items);
    } catch (error) {
        console.error("Error fetching order details:", error.message);
        res.status(500).json({ msg: "Server error" });
    }
};