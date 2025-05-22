import express from "express";
import { getOrderHistory,  getOrderDetails} from "../controllers/OrderController.js";
const router = express.Router();

router.get('/orders', getOrderHistory); // Route untuk riwayat transaksi

router.get('/orders/:orderId', getOrderDetails); // Route untuk detail transaksi


export default router;
