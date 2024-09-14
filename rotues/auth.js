const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const router = express.Router();

// Dummy users
const dummyUsers = [
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" },
  { username: "user3", password: "password3" },
];

// Register dummy users
dummyUsers.forEach(async ({ username, password }) => {
  const userExists = await User.findOne({ username });
  if (!userExists) {
    const user = new User({ username, password });
    await user.save();
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).send({ error: "Invalid login credentials" });
    }
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordMatch) {
      return res.status(400).send({ error: "Invalid login credentials" });
    }
    const token = jwt.sign({ _id: user._id }, "your_jwt_secret");
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
