// models/CartModel.js
import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";
import Product from "./ProductModel.js";
import User from './UserModel.js';

const Cart = db.define("cart", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    freezeTableName: true,
});

Cart.belongsTo(Product, { foreignKey: "productId" });
Cart.belongsTo(User, { foreignKey: 'userId' });

export default Cart;
