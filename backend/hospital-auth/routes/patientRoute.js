const express = require("express");
const router = express.Router();
const patientController = require("./../controller/patientController");

// Route to get all patients
router.get("/", patientController.getAllPatients);

// Route to get a patient by patientId
router.get("/:patientId", patientController.getPatientById);

// Route to create a new patient
router.post("/", patientController.createPatient);

module.exports = router;
