const Patient = require("./../models/patientModel");

exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving patients",
      error: error.message,
    });
  }
};

exports.getPatientById = async (req, res) => {
  const { patientId } = req.params;
  try {
    const patient = await Patient.findOne({ where: { patientId } });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving patient",
      error: error.message,
    });
  }
};

exports.createPatient = async (req, res) => {
  const {
    patientId,
    fullName,
    middleName,
    lastName,
    dob,
    age,
    phone,
    email,
    address,
    gender,
    language,
    bloodGroup,
    existingId,
    pin,
    createdById,
    createdByName,
    modifiedById,
    modifiedByName,
  } = req.body;
  const profileImage = req.file ? req.file.path : null;
  try {
    const newPatient = await Patient.create({
      patientId,
      fullName,
      middleName,
      lastName,
      dob,
      age,
      phone,
      email,
      address,
      gender,
      language,
      bloodGroup,
      existingId,
      pin,
      profileImage,
      createdById,
      createdByName,
      modifiedById,
      modifiedByName,
    });
    res.status(201).json(newPatient);
  } catch (error) {
    console.error('Error creating patient:', error.errors || error.message);
    res.status(500).json({
      message: "Error creating patient",
      error: error.errors ? error.errors.map(err => err.message) : error.message,
    });
  }
};

exports.updatePatient = async (req, res) => {
  const { patientId } = req.params;
  const {
    fullName,
    middleName,
    lastName,
    dob,
    age,
    phone,
    email,
    address,
    gender,
    language,
    bloodGroup,
    existingId,
    pin,
    modifiedById,
    modifiedByName,
  } = req.body;
  try {
    const patient = await Patient.findOne({ where: { patientId } });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    await patient.update({
      fullName,
      middleName,
      lastName,
      dob,
      age,
      phone,
      email,
      address,
      gender,
      language,
      bloodGroup,
      existingId,
      pin,
      modifiedById,
      modifiedByName,
    });
    res.status(200).json({ message: "Patient updated successfully", patient });
  } catch (error) {
    console.error('Error updating patient:', error);
    res.status(500).json({
      message: "Error updating patient",
      error: error.message,
    });
  }
};
