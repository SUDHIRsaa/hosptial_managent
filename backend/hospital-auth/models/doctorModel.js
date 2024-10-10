const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Staff = sequelize.define(
  "doctors",
  {
    doctorId: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    specialization: {
      type: DataTypes.STRING(50),
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 100,
      },
    },
    birthday: {
      type: DataTypes.DATE,
    },
    gender: {
      type: DataTypes.STRING(10),
    },
    mobile: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    countryCode: {
      type: DataTypes.STRING(10),
      defaultValue: "+91",
    },
    email: {
      type: DataTypes.STRING(100),
    },
    address: {
      type: DataTypes.JSON, // Nested object structure can be stored as JSON
    },
    documentType: {
      type: DataTypes.STRING(100),
    },
    documentNumber: {
      type: DataTypes.STRING(100),
    },
    upiId: {
      type: DataTypes.STRING(100),
    },
    bankName: {
      type: DataTypes.STRING(100),
    },
    accountName: {
      type: DataTypes.STRING(255),
    },
    accountNo: {
      type: DataTypes.STRING(100),
    },
    ifsc: {
      type: DataTypes.STRING(50),
    },
    createdById: {
      type: DataTypes.STRING,
    },
    createdByName: {
      type: DataTypes.STRING(255),
    },

    modifiedById: {
      type: DataTypes.STRING,
    },
    modifiedByName: {
      type: DataTypes.STRING(255),
    },
    profilePic: {
      type: DataTypes.STRING,
    },
    documents: {
      type: DataTypes.JSON, // Store documents as an array of objects
    },
    availableTimeSlot: {
      type: DataTypes.JSON, // Store availableTimeSlot as JSON for flexibility
    },
  },
  {
    timestamps: true,
    paranoid: true, // Manually managing created and modified timestamps
  }
);

module.exports = Staff;
