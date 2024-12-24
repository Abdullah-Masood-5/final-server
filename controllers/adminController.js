const Tasks = require('../models/listings');

exports.getAllListings = async (req, res) => {
  try {
    const hostId = req.user.id;
    const listings = await Tasks.find({ hostId });
    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.addListing = async (req, res) => {
  try {
    const { title, description, due_date } = req.body;
    const newListing = new Tasks({
      title,
      description,
      due_date,
      hostId: req.user.id
    });
    await newListing.save();
    res.status(201).json({ message: 'Listing created successfully', listing: newListing });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
    console.log(error);
  }
};

exports.updateListing = async (req, res) => {
  try {
    const { title, description, due_date } = req.body;
    const listing = await Tasks.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
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

exports.deleteListing = async (req, res) => {
  try {
    await Tasks.findByIdAndDelete(req.params.id);
    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
