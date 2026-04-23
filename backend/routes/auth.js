const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

/*
  REGISTER
*/
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).send("All fields required");
    }

    if (password.length < 4) {
      return res.status(400).send("Password too short");
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).send("Email exists");
    }

    const hash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hash,
      role: "user",
    });

    await user.save();

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        name: user.firstName + " " + user.lastName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(201).json({ token });
  } catch {
    res.status(500).send("Server error");
  }
});

/*
  LOGIN
*/
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).send("Invalid");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).send("Invalid");

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        name: user.firstName + " " + user.lastName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ token });
  } catch {
    res.status(500).send("Server error");
  }
});

module.exports = router;