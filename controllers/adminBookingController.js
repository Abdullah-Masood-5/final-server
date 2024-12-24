const Booking = require('../models/booking');
const Listing = require('../models/listing');

exports.getHostBookings = async (req, res) => {
  try {
    const hostId = req.user.id;
    const hostListings = await Listing.find({ hostId });
    const listingIds = hostListings.map(listing => listing._id);
    const bookings = await Booking.find({ listingId: { $in: listingIds } }).populate('listingId', 'title location');

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
