// routes/adminRoutes.js

const express = require('express');
const { getAllListings, addListing, deleteListing, updateListing } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Fetch all listings
router.get('/docs', authMiddleware, getAllListings);

// Add a new listing (Host only)
router.post('/docs', authMiddleware, addListing);

// Edit a listing by ID
router.put('/docs/:id', authMiddleware, updateListing);

// Delete a listing by ID
router.delete('/docs/:id', authMiddleware, deleteListing);

module.exports = router;
