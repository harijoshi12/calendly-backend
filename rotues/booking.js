const express = require("express");
const Booking = require("../models/Booking.js");
const Availability = require("../models/Availability.js");
const auth = require("../middleware/auth.js");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const availability = await Availability.findById(req.body.availabilityId);
    if (!availability) {
      return res.status(404).send({ error: "Availability not found" });
    }

    const timeSlot = availability.timeSlots.find(
      (slot) =>
        slot.startTime === req.body.timeSlot.startTime &&
        slot.endTime === req.body.timeSlot.endTime
    );

    if (!timeSlot || !timeSlot.isAvailable) {
      return res.status(400).send({ error: "Time slot is not available" });
    }

    timeSlot.isAvailable = false;
    await availability.save();

    const booking = new Booking({
      ...req.body,
      userId: req.user._id,
    });
    await booking.save();
    res.status(201).send(booking);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id });
    res.send(bookings);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
