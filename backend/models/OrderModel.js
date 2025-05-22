import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";
import User from './UserModel.js';

const Order = db.define('orders', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "Pending" // Status default saat checkout
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    freezeTableName: true
});

Order.belongsTo(User, { foreignKey: 'userId' });

export default Order;

(async () => {
    await db.sync();
})();
