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

const TransactionItem = sequelize.define(
    "transaction_item",
    {
        ID: {
            type: DataTypes.INTEGER(30),
            allowNull: false,
            primaryKey: true,
            default: "",
        },
        Type: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        Date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        Category: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        Amount: {
            type: DataTypes.FLOAT(30),
            allowNull: false,
        },
        Notes: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        USername: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
      },
    );

    module.exports= TransactionItem;