const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const {
  getServices,
  getServiceById,
  updateService,
  updateAvailability,
} = require("../controllers/services");

// Public
router.get("/", getServices);
router.get("/:id", getServiceById);

// Protected
router.put("/:id", verifyToken, updateService);
router.put("/:id/availability", verifyToken, updateAvailability);

module.exports = router;