const express = require("express");
const Availability = require("../models/Availability.js");
const auth = require("../middleware/auth.js");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const availability = new Availability({
      ...req.body,
      userId: req.user._id,
    });
    await availability.save();
    res.status(201).send(availability);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const availabilities = await Availability.find({ userId: req.user._id });
    res.send(availabilities);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
