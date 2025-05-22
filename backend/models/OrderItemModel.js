import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";
import Product from "./ProductModel.js";
import Order from './OrderModel.js';

const OrderItem = db.define('order_items', {
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    subtotal: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    freezeTableName: true
});

// Relasi: OrderItem belongsTo Product
OrderItem.belongsTo(Product, {
    foreignKey: 'productId', // nama kolom foreign key di tabel order_item
    as: 'product' // alias yang akan digunakan di include
});
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

export default OrderItem;

(async () => {
    await db.sync();
})();
