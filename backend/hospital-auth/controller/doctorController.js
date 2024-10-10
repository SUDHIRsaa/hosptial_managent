const Staff = require("./../models/doctorModel"); // Assuming the model is in the models directory
const User = require("./../models/userModel");
const sequelize = require("./../models/index");
const bcrypt = require("bcryptjs");

// GET: Retrieve all staff members
exports.getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.findAll(); // Fetch all staff from the database
    res.status(200).json(staff);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving staff", error: error.message });
  }
};

// GET: Retrieve a single staff member by ID
exports.getStaffById = async (req, res) => {
  const { id } = req.params;
  try {
    const staff = await Staff.findOne({ where: { doctorId: id } });
    if (!staff) {
      return res.status(404).json({ message: "Staff member not found" });
    }
    res.status(200).json(staff);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving staff", error: error.message });
  }
};

// POST: Create a new staff member
exports.createStaff = async (req, res) => {
  const {
    doctorId,
    firstName,
    lastName,
    specialization,
    age,
    birthday,
    gender,
    mobile,
    countryCode,
    email,
    address,
    documentType,
    documentNumber,
    upiId,
    bankName,
    accountName,
    accountNo,
    ifsc,
    createdById,
    createdByName,
    profilePic,
    documents,
    availableTimeSlot,
  } = req.body;

  const t = await sequelize.transaction(); // Start a transaction
  try {
    // Step 1: Hash the password for storing in the database
    const hashedPassword = await bcrypt.hash("doctor123", 10); // Hash password with bcrypt (10 rounds of salt)

    // Step 2: Create the User with the role 'doctor'
    const newUser = await User.create(
      {
        email,
        password: hashedPassword, // Store hashed password
        role: "doctor", // Set role to doctor
      },
      { transaction: t } // Use transaction
    );
    console.log("HIII");

    // Step 3: Create the Staff record
    const newStaff = await Staff.create(
      {
        doctorId,
        firstName,
        lastName,
        specialization,
        age,
        birthday,
        gender,
        mobile,
        countryCode,
        email,
        address,
        documentType,
        documentNumber,
        upiId,
        bankName,
        accountName,
        accountNo,
        ifsc,
        createdById,
        createdByName,
        profilePic,
        documents,
        availableTimeSlot,
        userId: newUser.id, // Link staff to the newly created user
      },
      { transaction: t } // Use transaction
    );

    // Step 4: Commit the transaction if both operations are successful
    await t.commit();

    // Return success response with created staff and user data
    res.status(201).json({
      message: "Staff and User created successfully",
      staff: newStaff,
      user: newUser,
    });
  } catch (error) {
    // Rollback transaction in case of any error
    await t.rollback();

    // Return error response
    res
      .status(500)
      .json({ message: "Error creating staff member", error: error.message });
  }
};
