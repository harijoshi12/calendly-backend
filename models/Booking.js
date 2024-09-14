const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  availabilityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Availability",
    required: true,
  },
  timeSlot: {
    startTime: String,
    endTime: String,
  },
  date: { type: Date, required: true },
});

module.exports = mongoose.model("Booking", bookingSchema);
