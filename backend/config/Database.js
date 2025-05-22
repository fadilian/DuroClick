import { Sequelize } from "sequelize";

// import (Sequelize)
const db = new Sequelize('duroclick','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

export default db;