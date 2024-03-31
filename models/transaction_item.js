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
        transaction_id: {
            type: DataTypes.INTEGER(30),
            allowNull: false,
            primaryKey: true,
            default: "",
        },
        type: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        transaction_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        amount: {
            type: DataTypes.FLOAT(30),
            allowNull: false,
        },
        notes: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        username: {
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