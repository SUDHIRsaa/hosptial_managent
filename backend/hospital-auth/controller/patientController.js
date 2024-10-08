const Patient = require("./../models/patientModel"); // Assuming the model is in the models directory

// GET: Retrieve all patients
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll(); // Fetch all patients from the database
    res.status(200).json(patients);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving patients", error: error.message });
  }
};

// GET: Retrieve a specific patient by patientId
exports.getPatientById = async (req, res) => {
  const { patientId } = req.params;
  try {
    const patient = await Patient.findOne({ where: { patientId } });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving patient", error: error.message });
  }
};

// POST: Create a new patient
exports.createPatient = async (req, res) => {
  const {
    patientId,
    firstName,
    lastName,
    age,
    height,
    weight,
    birthday,
    gender,
    mobile,
    whatsapp,
    countryCode,
    email,
    address,
    documentType,
    documentNumber,
    createdById,
    createdByName,
    modifiedById,
    modifiedByName,
    documents,
  } = req.body;

  try {
    const newPatient = await Patient.create({
      patientId,
      firstName,
      lastName,
      age,
      height,
      weight,
      birthday,
      gender,
      mobile,
      whatsapp,
      countryCode,
      email,
      address,
      documentType,
      documentNumber,
      createdById,
      createdByName,
      modifiedById,
      modifiedByName,
      documents,
    });

    res.status(201).json(newPatient); // Respond with the newly created patient data
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating patient", error: error.message });
  }
};
