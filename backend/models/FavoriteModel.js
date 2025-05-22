import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";
import User from "./UserModel.js";
import Product from "./ProductModel.js";

// Model Favorite untuk menghubungkan User dan Product
const Favorite = db.define('favorite', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'id'
        }
    }
}, {
    freezeTableName: true
});

// Relasi: User memiliki banyak Produk favorit
Favorite.belongsTo(User, { foreignKey: 'userId' });
Favorite.belongsTo(Product, { foreignKey: 'productId' });

export default Favorite;

(async () => {
    await db.sync(); // Sinkronisasi dengan database
})();
