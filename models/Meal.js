const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Meal extends Model {}

//create meal table
Meal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    breakfast: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   lunch: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    dinner: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Meal',
  }
);

module.exports = Meal;
