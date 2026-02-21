const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Quotation = sequelize.define(
    "Quotation",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(150),
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        eventType: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        eventDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        venue: {
            type: DataTypes.STRING(300),
            allowNull: true,
        },
        guestCount: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        functions: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        servicesRequested: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: [],
        },
        budget: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        requirements: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM("New", "Contacted", "Closed"),
            defaultValue: "New",
        },
    },
    {
        tableName: "quotations",
        timestamps: true,
    }
);

module.exports = Quotation;
