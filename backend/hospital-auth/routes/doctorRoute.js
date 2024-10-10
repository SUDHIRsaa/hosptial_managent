const express = require("express");
const router = express.Router();
const staffController = require("./../controller/doctorController");


router.get("/", staffController.getAllStaff);


router.get("/:id", staffController.getStaffById);


router.post("/", staffController.createStaff);

module.exports = router;
