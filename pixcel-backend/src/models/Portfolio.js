const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Portfolio = sequelize.define(
    "Portfolio",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING(200),
            allowNull: true,
            unique: true,
        },
        category: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        coverImage: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        images: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: [],
        },
        clientName: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
        eventDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        featured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        tableName: "portfolios",
        timestamps: true,
    }
);

module.exports = Portfolio;
