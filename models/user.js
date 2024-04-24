const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config");

const sequelize = new Sequelize(
    config.DATABASE,
    config.USER,
    config.PASSWORD,
    {
        dialect: config.DIALECT,
    }
);

const user = sequelize.define(
    "userdb",
    {
        userId: {
            type: DataTypes.INTEGER(30),
            allowNull: false,
            primaryKey: true,
            default: "",
        },
        username:{
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        password:{
            type: DataTypes.STRING(255),
            allowNull: false,
        },

    },
    {
        freezeTableName: true,
        timestamps: false,
      },
);

module.exports= user;