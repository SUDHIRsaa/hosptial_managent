const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER, // Change from VARCHAR to INTEGER
      autoIncrement: true, // Use autoIncrement for integer-based IDs
      primaryKey: true, // Mark it as the primary key
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Ensures the format is an email
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "doctor", "patient"), // You can extend roles as needed
      defaultValue: "patient", // Default role if not provided
    },
  },
  {
    timestamps: true, // This adds `createdAt` and `updatedAt` fields automatically
    paranoid: true, // This adds a `deletedAt` field to implement soft deletes
  }
);

module.exports = User;
