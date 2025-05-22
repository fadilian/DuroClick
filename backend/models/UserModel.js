import { Sequelize, DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import db from "../config/Database.js";

const User = db.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.STRING,
    telp: DataTypes.STRING,
    address: DataTypes.STRING,
    password: DataTypes.STRING,
    level: {
        type: DataTypes.STRING,
        defaultValue: "member" 
    }
}, {
    freezeTableName: true,
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                user.password = await bcrypt.hash(user.password, 10); // Hash password sebelum simpan
            }
        }
    }
});

export default User;

(async () => {
    await db.sync();
})();
