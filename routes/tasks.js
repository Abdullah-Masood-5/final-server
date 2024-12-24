const express = require("express");
const {
  getAllListings,
  addListing,
  deleteListing,
  updateListing,
} = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Fetch all tasks for the authenticated host
router.get("/docs", authMiddleware, getAllListings);

// Add a new task for the authenticated host
router.post("/docs", authMiddleware, addListing);

// Edit a task by ID
router.put("/docs/:id", authMiddleware, updateListing);

// Delete a task by ID
router.delete("/docs/:id", authMiddleware, deleteListing);

module.exports = router;
