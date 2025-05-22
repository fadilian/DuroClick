import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";
import Category from "./CategoryModel.js";

const Product = db.define('product', {
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'id'
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2), // Format untuk harga
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true
});

// Relasi dengan Category
Product.belongsTo(Category, { foreignKey: 'categoryId' });

export default Product;

(async () => {
    await db.sync(); // Sinkronisasi dengan database
})();
