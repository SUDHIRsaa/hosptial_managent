const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Patient = sequelize.define(
  "Patient",
  {
    patientId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    fullName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    middleName: {
      type: DataTypes.STRING(255),
      allowNull: true, // Optional field
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 100,
      },
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true, // Ensures it's a valid email format
      },
    },
    address: {
      type: DataTypes.JSON, // For the nested object structure
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bloodGroup: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    existingId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profileImage: {
      type: DataTypes.STRING, // Path to the uploaded image
      allowNull: true, // Optional field
    },
    createdById: {
      type: DataTypes.STRING, // Mapping `created.by.id`
      allowNull: true, // Optional field
    },
    createdByName: {
      type: DataTypes.STRING(255), // Mapping `created.by.name`
      allowNull: true, // Optional field
    },
    modifiedById: {
      type: DataTypes.STRING, // Mapping `modified.by.id`
      allowNull: true, // Optional field
    },
    modifiedByName: {
      type: DataTypes.STRING(255), // Mapping `modified.by.name`
      allowNull: true, // Optional field
    },
    
  },
  {
    timestamps: true, // This adds `createdAt` and `updatedAt` fields automatically
    paranoid: true, // This adds a `deletedAt` field to implement soft deletes
  }
);

module.exports = Patient;
