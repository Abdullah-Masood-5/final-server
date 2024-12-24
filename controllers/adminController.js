const Tasks = require('../models/listings');

// Get all listings for the authenticated host
exports.getAllListings = async (req, res) => {
  try {
    const hostId = req.user.id; // Extract hostId from the token
    const listings = await Tasks.find({ hostId });
    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Add a new listing for the authenticated host
exports.addListing = async (req, res) => {
  try {
    const hostId = req.user.id; // Extract hostId from the token
    const { title, description, due_date } = req.body;

    const newListing = new Tasks({
      title,
      description,
      due_date,
      hostId, // Associate the listing with the authenticated host
    });

    await newListing.save();
    res.status(201).json({ message: 'Listing created successfully', listing: newListing });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update a listing for the authenticated host
exports.updateListing = async (req, res) => {
  try {
    const hostId = req.user.id; // Extract hostId from the token
    const { title, description, due_date } = req.body;

    const listing = await Tasks.findOne({ _id: req.params.id, hostId });

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found or unauthorized' });
    }

    listing.title = title || listing.title;
    listing.description = description || listing.description;
    listing.due_date = due_date || listing.due_date;

    await listing.save();
    res.json({ message: 'Listing updated successfully', listing });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a listing for the authenticated host
exports.deleteListing = async (req, res) => {
  try {
    const hostId = req.user.id; // Extract hostId from the token
    const listing = await Tasks.findOneAndDelete({ _id: req.params.id, hostId });

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found or unauthorized' });
    }

    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
