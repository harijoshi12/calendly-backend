const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  timeSlots: [
    {
      startTime: String,
      endTime: String,
      isAvailable: { type: Boolean, default: true },
    },
  ],
});

module.exports = mongoose.model("Availability", availabilitySchema);
