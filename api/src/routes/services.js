const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const {
  getAvailability,
  getGlobalAvailability,
  getServiceAvailability,
  updateAvailability
} = require("../controllers/availability");

// Public
router.get("/", getAvailability);
router.get("/global", getGlobalAvailability);
router.get("/service/:service_id", getServiceAvailability);

// Protected
router.put("/:id", verifyToken, updateAvailability);

module.exports = router;