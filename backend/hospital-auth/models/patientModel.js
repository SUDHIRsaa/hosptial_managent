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
    firstName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 100,
      },
    },
    height: {
      type: DataTypes.FLOAT,
    },
    weight: {
      type: DataTypes.FLOAT,
    },
    birthday: {
      type: DataTypes.DATE,
    },
    gender: {
      type: DataTypes.STRING,
    },
    mobile: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    whatsapp: {
      type: DataTypes.STRING(15),
    },
    countryCode: {
      type: DataTypes.STRING(10),
      defaultValue: "+91",
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true, // Ensures it's a valid email format
      },
    },
    address: {
      type: DataTypes.JSON, // For the nested object structure
    },
    documentType: {
      type: DataTypes.STRING,
    },
    documentNumber: {
      type: DataTypes.STRING,
    },
    createdById: {
      type: DataTypes.STRING, // Mapping `created.by.id`
    },
    createdByName: {
      type: DataTypes.STRING(255), // Mapping `created.by.name`
    },
    modifiedById: {
      type: DataTypes.STRING, // Mapping `modified.by.id`
    },
    modifiedByName: {
      type: DataTypes.STRING(255), // Mapping `modified.by.name`
    },
    documents: {
      type: DataTypes.JSON, // For storing document array
    },
  },
  {
    timestamps: true, // This adds `createdAt` and `updatedAt` fields automatically
    paranoid: true, // This adds a `deletedAt` field to implement soft deletes
  }
);

module.exports = Patient;
