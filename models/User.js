const router = require('express').Router();
const { User } = require('../../models');

class user extends Models {

};
//create user table 
User.init(
    {
      id: {  //enter id
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {  //enter name
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {  //enter name
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {  //enter email address
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {   //enter password
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8],
        },
      },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'calories',
      },
      {
        hooks: {
          beforeCreate: async (newUserData) => {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
          },
          beforeUpdate: async (updatedUserData) => {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
          },
        },
      });

    module.exports = userMeals;
    