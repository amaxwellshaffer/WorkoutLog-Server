//WORKOUT LOG
//WORKOUT LOG
//WORKOUT LOG

const sequelize = require('sequelize');
const database = require('../db');

module.exports = database.define('user', {
    username: { 
        type: sequelize.STRING,
        allowNull: false,
        unique: true
    },
    passwordhash: {
        type: sequelize.STRING,
        allowNull: false
    }
});
