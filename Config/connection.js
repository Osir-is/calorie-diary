const { Sequelize } = require('sequelize');
const { connection, DataTypes } = require('./db');

const Users = connection.define('User', {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    sessionId: { type: DataTypes.STRING(22), allowNull: false },
    Email: { type: DataTypes.STRING(50) },
    userName: { type: DataTypes.STRING(50) }
}, {
    timestamps: false,
});

const Stress = connection.define('Stress', {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    usersId: { type: DataTypes.INTEGER },
    moods: { type: DataTypes.STRING(10) },
    hoursSleep: { type: DataTypes.INTEGER },
    minsExercise: { type: DataTypes.INTEGER },
    coffeeUnits: { type: DataTypes.INTEGER },
    inputDate: { type: DataTypes.STRING(50) }
}, {
    timestamps: false,
});


module.exports = {
    Users,
    Stress,
    Health,
    Image
};