const express = require("express");
const router = express.Router();
const patientController = require("./../controller/patientController");

// Route to get all patients
router.get("/patients", patientController.getAllPatients);

// Route to get a patient by patientId
router.get("/patients/:patientId", patientController.getPatientById);

// Route to create a new patient
router.post("/patients", patientController.createPatient);

module.exports = router;
