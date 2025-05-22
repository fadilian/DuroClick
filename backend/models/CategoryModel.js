import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";

const Category = db.define('category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true
});

export default Category;

(async () => {
    await db.sync(); // Sinkronisasi dengan database
})();
