const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const validateId = require("../middleware/validateId");


const {
  getProjects,
  getFeaturedProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projects");

// Public
router.get("/", getProjects);
router.get("/featured", getFeaturedProjects);
router.get("/:id", validateId, getProjectById);

// Protected
router.post("/", verifyToken, createProject);
router.put("/:id", verifyToken, validateId, updateProject);
router.delete("/:id", verifyToken, validateId, deleteProject);

module.exports = router;