const Sequelize = require("sequelize");

const sequelize = new Sequelize('wecodepoject2', 'root', '123getaneh', {
    dialect: 'mysql',
    host: 'localhost'
})
module.exports = sequelize;