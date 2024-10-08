const express = require("express");
const router = express.Router();
const staffController = require("./../controller/doctorController");

// Route to get all staff
router.get("/", staffController.getAllStaff);

// Route to get a staff member by ID
router.get("/:id", staffController.getStaffById);

// Route to create a new staff member
router.post("/", staffController.createStaff);

module.exports = router;
